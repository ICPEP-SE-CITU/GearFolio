import {account} from "./api";

// This function creates a new user account using the email and password
export const signup = async (email, password, name) => {
    try {
        return await account.create("unique()", email, password, name);
    } catch (error) {
        console.error("Signup Error:", error);
        throw error;
    }
};

// This function creates a login session using the email and password
export const login = async (email, password) => {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (error) {
        console.error("Login Error:", error);
        throw new Error(error.message || "Failed to log in");
    }
};

//////////////////////////////////////////////////
// OAUTH and Token //

// This function creates an OAuth login session using the provider
export const oauthLogin = async (provider) => {
    try {
        // Redirect user to the OAuth provider
        account.createOAuth2Session(provider, window.location.origin, window.location.origin);
    } catch (error) {
        console.error("OAuth Login Error:", error);
        throw new Error(error.message || "OAuth login failed");
    }
};

// This function retrieves the user's authentication token after OAuth login
export const getAuthToken = async () => {
    try {
        const session = await account.getSession("current"); // Get current session
        return session ? session.secret : null; // Return the session token
    } catch (error) {
        console.error("Error fetching auth token:", error);
        throw new Error(error.message || "Failed to fetch authentication token");
    }
};
//////////////////////////////////////////////////

// Logout
export const logout = async () => {
    try {
        await account.deleteSession("current"); // Logs out the current session
    } catch (error) {
        console.error("Logout Error:", error);
        throw new Error(error.message || "Failed to log out");
    }
};

// Logout from all devices (clear all sessions), useful for development
export const logoutFromAllDevices = async () => {
    try {
        await account.deleteSessions(); // Clears all active sessions
    } catch (error) {
        console.error("Logout from All Devices Error:", error);
        throw new Error(error.message || "Failed to log out from all devices");
    }
};

//////////////////////////////////////////////////
// LOGOUT FROM A SPECIFIC DEVICE //

// Get all active sessions
export const getSessions = async () => {
    try {
        return await account.listSessions();
    } catch (error) {
        console.error("Error fetching sessions:", error);
        throw new Error(error.message || "Failed to fetch sessions");
    }
};

// Logout from a specific session (selected device)
export const logoutFromSession = async (sessionId) => {
    try {
        await account.deleteSession(sessionId); // Delete only the selected session
    } catch (error) {
        console.error("Error logging out from session:", error);
        throw new Error(error.message || "Failed to log out from the selected session");
    }
};
//////////////////////////////////////////////////