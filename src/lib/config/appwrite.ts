import { Client, Databases, Storage } from "appwrite";

// Check for environment variables, use default values for development
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'your-project-id';

// Log a warning if environment variables are missing
if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
  console.warn('Warning: NEXT_PUBLIC_APPWRITE_ENDPOINT is not defined. Using default endpoint.');
}

if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
  console.warn('Warning: NEXT_PUBLIC_APPWRITE_PROJECT_ID is not defined. Using default project ID.');
}

const client = new Client();

// Initialize client with error handling
try {
  client
    .setEndpoint(endpoint)
    .setProject(projectId);
} catch (error) {
  console.error('Error initializing Appwrite client:', error);
}

const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, storage };