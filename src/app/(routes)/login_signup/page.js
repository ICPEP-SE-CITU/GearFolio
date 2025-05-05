"use client";
import React from "react";
import { account, ID, databases } from "@/appwrite/browser";
import { useRouter } from "next/navigation";
import { Query } from "appwrite";

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7.5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7.5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.02.152-2.007.438-2.938M9.88 9.88a3 3 0 114.242 4.242M15 12a3 3 0 00-3-3M3 3l18 18" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
    <path d="M533.5 278.4c0-18.2-1.6-36-4.7-53.2H272v100.8h146.9c-6.3 34-25.1 62.8-53.4 82l86.2 66.7c50.3-46.4 81.8-114.8 81.8-196.3z" fill="#4285F4" />
    <path d="M272 544.3c72.6 0 133.7-24.1 178.2-65.6l-86.2-66.7c-24 16.1-54.7 25.6-92 25.6-70.8 0-130.8-47.8-152.4-112.1H30.7v70.6C74.5 480.9 167.5 544.3 272 544.3z" fill="#34A853" />
    <path d="M119.6 325.5c-10.1-30-10.1-62.1 0-92.1V162.7H30.7c-36.4 71.6-36.4 157.4 0 229l88.9-66.2z" fill="#FBBC04" />
    <path d="M272 107.7c39.5-.6 77.6 14.3 106.4 41.5l79.4-79.4C404.7 24.1 343.6 0 272 0 167.5 0 74.5 63.4 30.7 162.7l88.9 70.7c21.6-64.3 81.6-112.1 152.4-112.1z" fill="#EA4335" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
</svg>
);

class AuthForm extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    isSignUp: true,
    showForgotPassword: false,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    errors: {},
    resetEmailSent: false,
  };
}

componentDidMount() {
  this.checkSession();
}

checkSession = async () => {
  try {
    await account.get(); // throws error if no session
    this.props.router.push("/dashboard"); // if session exists, redirect
  } catch (error) {
    // No session found — do nothing, stay on login/signup
  }
};

validate = () => {
  const newErrors = {};

  if (!this.state.username.trim()) {
    newErrors.username = "Username is required.";
  }

  if (this.state.isSignUp) {
    if (!this.state.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.state.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!this.state.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (this.state.password !== this.state.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
  }

  if (!this.state.password) {
    newErrors.password = "Password is required.";
  }

  this.setState({ errors: newErrors });
  return Object.keys(newErrors).length === 0;
};

validateForgotPassword = () => {
  const newErrors = {};
  
  if (!this.state.email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.state.email)) {
    newErrors.email = "Enter a valid email address.";
  }
  
  this.setState({ errors: newErrors });
  return Object.keys(newErrors).length === 0;
};

handleSubmit = async (e) => {
  e.preventDefault();
  if (!this.validate()) return;

  await this.handleAuth({
    email: this.state.email,
    password: this.state.password,
    username: this.state.username,
    isSignUp: this.state.isSignUp,
  });
};

handleForgotPasswordSubmit = (e) => {
  e.preventDefault();
  if (this.validateForgotPassword()) {
    // Simulate sending reset email
    this.setState({ resetEmailSent: true });
    setTimeout(() => {
      this.setState({ showForgotPassword: false, resetEmailSent: false });
    }, 3000);
  }
};

handleCloseForgotPassword = () => {
  this.setState({ showForgotPassword: false, errors: {}, email: "" });
};

handleAuth = async ({ username, email, password, isSignUp }) => {
  try {
    if (isSignUp) {
      // Check if username already exists
      const existing = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        "6813f062002741c63f67", // Your collection ID for username mapping
        [Query.equal("username", username)]
      );

      if (existing.documents.length > 0) {
        throw new Error("Username already taken.");
      }

      // 1. Create the Appwrite user
      const newUser  = await account.create(ID.unique(), email, password, username); // `username` goes into `name`

      // 2. Save the username mapping
      await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_COLLECTION_USERNAME,
        ID.unique(),
        {
          userId: newUser .$id,
          username: username,
          email: email,
        }
      );

      // Check if there's an active session and delete it if necessary
      try {
        await account.get();
        await account.deleteSession('current');
      } catch (error) {
        // No active session, proceed with creating a new one
      }

              // 3. Log in the user
              await account.createEmailPasswordSession(email, password);
            } else {
              // LOGIN FLOW
              const res = await databases.listDocuments(
                process.env.NEXT_PUBLIC_DATABASE_ID,
                process.env.NEXT_PUBLIC_COLLECTION_USERNAME,
                [Query.equal("username", username)]
              );
      
              if (res.documents.length === 0) {
                throw new Error("Username not found.");
              }
      
              const userEmail = res.documents[0].email;
      
              // Check if there's an active session and delete it if necessary
              try {
                await account.get();
                await account.deleteSession('current');
              } catch (error) {
                // No active session, proceed with creating a new one
              }
      
              await account.createEmailPasswordSession(userEmail, password);
            }
      
            // Redirect to dashboard
            window.location.href = "/dashboard";
          } catch (err) {
            // Handle error (e.g., show error message)
            console.error(err);
            this.setState({ errors: { ...this.state.errors, general: err.message } });
          }
        };
      
        toggleShowPassword = () => {
          this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
        };
      
        toggleShowConfirmPassword = () => {
          this.setState((prevState) => ({ showConfirmPassword: !prevState.showConfirmPassword }));
        };
      
        toggleForgotPassword = () => {
          this.setState((prevState) => ({ showForgotPassword: !prevState.showForgotPassword }));
        };
      
        toggleSignUp = () => {
          this.setState((prevState) => ({ isSignUp: !prevState.isSignUp }));
        };
      
        render() {
          const {
            isSignUp,
            showForgotPassword,
            username,
            email,
            password,
            confirmPassword,
            showPassword,
            showConfirmPassword,
            errors,
            resetEmailSent,
          } = this.state;
      
          if (showForgotPassword) {
            return (
              <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-blue-100 to-white">
                <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md border border-gray-300 relative">
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={this.handleCloseForgotPassword}
                  >
                    <CloseIcon />
                  </button>
      
                  <h2 className="text-center text-4xl sm:text-5xl font-bold text-blue-900 font-['Geist'] mt-2">
                    Reset Your Password
                  </h2>
      
                  {resetEmailSent ? (
                    <div className="mt-8 text-center">
                      <p className="text-lg text-gray-700">
                        We've sent a password reset link to <span className="font-semibold">{email}</span>.
                      </p>
                      <p className="mt-4 text-gray-600">
                        Please check your email and follow the instructions to reset your password.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={this.handleForgotPasswordSubmit} className="mt-8 space-y-6 mx-auto">
                      <div>
                        <label className="block text-lg font-semibold text-blue-900 font-['Geist']">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => this.setState({ email: e.target.value })}
                          placeholder="Enter your email"
                          className="w-full px-4 py-3 mt-1 bg-white border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
      
                      <p className="text-gray-600 text-center">
                        Enter the email address associated with your account and we'll send you a link to reset your password.
                      </p>
      
                      <button
                        type="submit"
                        className="w-full py-4 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition mt-4 mb-4"
                      >
                        Send Reset Link
                      </button>
      
                      <div className="text-center mt-4">
                        <button
                          onClick={this.toggleForgotPassword}
                          className="text-blue-600 hover:underline"
                        >
                          Remember your password? Sign in
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            );
          }
      
          return (
            <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-blue-100 to-white">
              <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md border border-gray-300 relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => alert("Close button clicked!")}
                >
                  <CloseIcon />
                </button>
      
                <h2 className="text-center text-4xl sm:text-5xl font-bold text-blue-900 font-['Geist'] mt-2">
                  {isSignUp ? "Create Account" : "Sign In"}
                </h2>
      
                <form onSubmit={this.handleSubmit} className="mt-8 space-y-6 mx-auto">
                  {/* Username */}
                  <div>
                    <label className="block text-lg font-semibold text-blue-900 font-['Geist']">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => this.setState({ username: e.target.value })}
                      className="w-full px-4 py-3 mt-1 bg-white border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                  </div>
      
                  {/* Email - Only shown in Sign Up */}
                  {isSignUp && (
                    <div>
                      <label className="block text-lg font-semibold text-blue-900 font-['Geist']">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        className="w-full px-4 py-3 mt-1 bg-white border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  )}
      
                  {/* Password */}
                  <div className="relative">
                    <label className="block text-lg font-semibold text-blue-900 font-['Geist']">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => this.setState({ password: e.target.value })}
                      className="w-full px-4 py-3 mt-1 bg-white border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                      type="button"
                      onClick={this.toggleShowPassword}
                      className="absolute top-10 right-4"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
      
                  {/* Confirm Password - Only shown in Sign Up */}
                  {isSignUp && (
                    <div className="relative">
                      <label className="block text-lg font-semibold text-blue-900 font-['Geist']">
                        Confirm Password
                      </label>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 mt-1 bg-white border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <button
                        type="button"
                        onClick={this.toggleShowConfirmPassword}
                        className="absolute top-10 right-4"
                      >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  )}
      
                  {/* Forgot Password - Only shown in Sign In */}
                  {!isSignUp && (
                    <div className="text-right">
                      <button 
                        onClick={this.toggleForgotPassword}
                        className="text-blue-600 hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}
      
                  {/* Submit Button */}
                  <button
                    type="submit"
                                  className="w-full py-4 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition mt-4 mb-4"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>

            {/* OR Divider */}
            <div className="flex items-center my-8 mt-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-3 text-gray-500 font-['Geist']">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              <GoogleIcon />
              <span className="text-gray-600 text-lg font-['Geist']">
                Continue with Google
              </span>
            </button>
          </form>

          {/* Toggle between Sign Up and Sign In */}
          <p className="mt-6 text-center text-gray-600 text-lg font-['Geist']">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={this.toggleSignUp}
              className="text-blue-600 font-bold hover:underline focus:outline-none"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default AuthForm;
