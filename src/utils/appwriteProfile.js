// src/utils/appwriteProfile.js
import { storage, profileBucketId } from './appwrite';

// Function to get a user's profile image URL by filename
const getProfileImageByName = async (filename) => {
    try {
        if (typeof window === 'undefined') {
            return null;
        }

        // List files to find the one with matching name
        const response = await storage.listFiles(profileBucketId);
        const file = response.files.find(file => file.name === filename);

        if (!file) {
            console.error("File not found:", filename);
            return null;
        }

        // Get file preview using the file ID
        return storage.getFilePreview(
            profileBucketId,
            file.$id,
            500, 500
        );
    } catch (error) {
        console.error("Error fetching profile image:", error);
        return null;
    }
};

export { getProfileImageByName };

/*

// USE THIS CODE FOR GETTING PROFILE IMAGE BY USER ID

// src/utils/appwriteProfile.js
import { storage, profileBucketId } from './appwrite';

// Function to get a user's profile image URL
const getProfileImageUrl = async (userId) => {
    try {
        // Safety check for server-side rendering
        if (typeof window === 'undefined') {
            return null;
        }

        // Get file preview URL from Appwrite Storage
        const fileId = `profile-${userId}`;

        return storage.getFilePreview(
            profileBucketId,
            fileId,
            500, 500
        );
    } catch (error) {
        console.error("Error fetching profile image:", error);
        return null;
    }
};

export { getProfileImageUrl };
 */