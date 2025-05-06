// src/utils/appwriteDashboard.js
import { Query } from "appwrite";
import { databases, databaseId, statsCollectionId } from './appwrite';

// Function to get all stats
const getStats = async () => {
    try {
        const response = await databases.listDocuments(
            databaseId,
            statsCollectionId
        );
        return response.documents;
    } catch (error) {
        console.error("Error fetching stats:", error);
        return [];
    }
};

// Function to get a specific stat by name
const getStatByName = async (statName) => {
    try {
        const response = await databases.listDocuments(
            databaseId,
            statsCollectionId,
            [Query.equal("name", statName)]
        );
        return response.documents[0];
    } catch (error) {
        console.error(`Error fetching ${statName} stat:`, error);
        return null;
    }
};

export { getStats, getStatByName };