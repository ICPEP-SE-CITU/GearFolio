"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, child } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6ZXwItxdpwoFOddkA-3LyA1HK6o1e3_4",
  authDomain: "loginsignup-72c9d.firebaseapp.com",
  projectId: "loginsignup-72c9d",
  storageBucket: "loginsignup-72c9d.firebasestorage.app",
  messagingSenderId: "995737244199",
  appId: "1:995737244199:web:c9213098e12859bdbe3402"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app, "https://loginsignup-72c9d-default-rtdb.asia-southeast1.firebasedatabase.app/");

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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

function AuthPage() {
  const [mode, setMode] = useState("login"); // default to login

  // Shared states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [accounts, setAccounts] = useState([]); // [{username, email, password}]
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  useEffect(() => {
    if (mode !== "signup") {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [mode]);

  const validateSignup = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required.";
    if (!email.trim()) newErrors.email = "Gmail is required.";
    else if (!/^[\w-.]+@gmail\.com$/.test(email)) newErrors.email = "Enter a valid Gmail address (must end with @gmail.com).";
    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!username.trim() && !email.trim()) newErrors.username = "Username or Email is required.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateSignup()) {
      const exists = accounts.some(acc => acc.username === username || acc.email === email);
      if (exists) {
        setPopup({ show: true, message: "Account already exists." });
        return;
      }
      setAccounts([...accounts, { username, email, password }]);
      // Save to Firebase Realtime Database
      try {
        await push(ref(database, 'users'), {
          username,
          gmail: email,
          password
        });
      } catch (error) {
        setPopup({ show: true, message: "Error saving to database." });
        return;
      }
      setPopup({ show: true, message: "Account has been created." });
      setUsername(""); setEmail(""); setPassword(""); setConfirmPassword("");
      setTimeout(() => {
        setPopup({ show: false, message: "" });
        setMode("login");
      }, 3000);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateLogin()) {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'users'));
        let found = false;
        if (snapshot.exists()) {
          const users = snapshot.val();
          for (const key in users) {
            const user = users[key];
            if (
              (user.username === username || user.gmail === username) &&
              user.password === password
            ) {
              found = true;
              break;
            }
          }
        }
        if (!found) {
          setPopup({ show: true, message: "Account not found." });
        } else {
          setPopup({ show: true, message: "Account log-in successful." });
        }
      } catch (error) {
        setPopup({ show: true, message: "Error fetching from database." });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      setPopup({ show: true, message: "Signed in with Google successfully!" });
    } catch (error) {
      setPopup({ show: true, message: "Google sign-in failed." });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotMessage("Please enter your Gmail address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      setForgotMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setForgotMessage("Failed to send reset email. Make sure the email is registered.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-md border border-gray-300 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => alert("Close button clicked!")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-center text-4xl sm:text-5xl font-bold text-blue-900 font-['Geist'] mt-2">
          {mode === "signup" ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={mode === "signup" ? handleSignup : handleLogin} className="mt-8 space-y-6 mx-auto max-w-md">
          {/* Username (always show) */}
          <div>
            <label className="block text-lg font-semibold text-blue-900 font-['Geist']">
              {mode === "signup" ? "Username" : "Username or Email"}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 mt-1 bg-white border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-300 text-black"
              placeholder={mode === "signup" ? "Enter your username" : "Enter your username or email"}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-lg font-semibold text-blue-900 font-['Geist']">
                Gmail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 mt-1 bg-white border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-300 text-black"
                placeholder="Enter your Gmail address"
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-1 bg-white border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-300 text-black"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-4"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            {/* Forgot Password link for login, right below password field */}
            {mode === "login" && (
              <div className="text-right mt-2">
                <button
                  className="text-blue-600 text-sm hover:underline"
                  type="button"
                  onClick={() => {
                    setShowForgot(true);
                    setForgotEmail("");
                    setForgotMessage("");
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}
          </div>

          {mode === "signup" && (
            <div className="relative">
              <label className="block text-lg font-semibold text-blue-900 font-['Geist']">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 mt-1 bg-white border border-zinc-300 rounded-md outline-none focus:ring-2 focus:ring-blue-300 text-black"
                placeholder="Verify your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-10 right-4"
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition mt-4 mb-4"
          >
            {mode === "signup" ? "Sign Up" : "Sign In"}
          </button>

          {/* OR Divider */}
          <div className="flex items-center my-8 mt-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500 font-['Geist']">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Auth Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon />
            <span className="text-gray-600 text-lg font-['Geist']">
              {mode === "signup" ? "Sign up with Google" : "Sign in with Google"}
            </span>
          </button>
        </form>

        {/* Toggle between Sign Up and Sign In */}
        <p className="mt-6 text-center text-gray-600 text-lg font-['Geist']">
          {mode === "signup" ? (
            <>Already have an account?{' '}
              <button
                className="text-blue-600 font-bold hover:underline focus:outline-none"
                onClick={() => {
                  setMode("login");
                  setErrors({});
                }}
              >
                Sign In
              </button>
            </>
          ) : (
            <>Don't have an account?{' '}
              <button
                className="text-blue-600 font-bold hover:underline focus:outline-none"
                onClick={() => {
                  setMode("signup");
                  setErrors({});
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </p>

        {popup.show && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white p-8 rounded-lg shadow-lg min-w-[300px] text-center">
              <p className="text-lg font-semibold text-blue-800">{popup.message}</p>
              {popup.message !== "Account has been created." && (
                <button
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => setPopup({ show: false, message: "" })}
                >
                  OK
                </button>
              )}
            </div>
          </div>
        )}

        {message && (
          <div className="mt-4 text-center text-lg font-semibold text-blue-700">{message}</div>
        )}

        {/* Forgot Password Modal */}
        {showForgot && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/30 backdrop-blur-sm">
            <div className="bg-white p-10 rounded-xl min-w-[350px] max-w-[95vw] text-center border border-gray-300" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h2 className="text-3xl font-bold mb-8 text-blue-800 text-left">Forgot your password?</h2>
              <form onSubmit={handleForgotPassword} className="text-left">
                <label className="block text-lg font-semibold text-blue-800 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded mb-6 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder=""
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded mb-2 hover:bg-blue-700 transition"
                >
                  Reset
                </button>
              </form>
              {forgotMessage && <div className="mt-2 text-blue-700 text-center">{forgotMessage}</div>}
              <button
                className="mt-4 px-4 py-1 bg-red-200 rounded hover:bg-red-300"
                onClick={() => setShowForgot(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;