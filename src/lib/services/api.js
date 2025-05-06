// APPWRITE API
import { Account, Client, Storage, Databases } from "appwrite";

// Go to .env.local to put your own API key for Appwrite, DO NOT CHANGE THIS CODE
// GET YOUR API KEY FROM YOUR LOCAL DEPLOYMENT OF APPWRITE
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client); // Creates an account instance
export const storage = new Storage(client); // Creates a storage instance
export const databases = new Databases(client); // Creates a database instance


/*
Export and define multiple database and bucket IDs from environment variables

NOTE: THIS IS JUST A PLACEHOLDER, NAMING AND NUMBER OF DATABASES/BUCKETS SUBJECT TO CHANGE
ONCE WE HAVE THE DATABASE AND BUCKET STRUCTURE AND SCHEMA
*/

// Define multiple database IDs
export const DATABASES = {
    MAIN_DB: process.env.NEXT_PUBLIC_APPWRITE_MAIN_DATABASE_ID,
    ANALYTICS_DB: process.env.NEXT_PUBLIC_APPWRITE_ANALYTICS_DATABASE_ID,
};

// Define multiple collection IDs
export const COLLECTIONS = {
    USERS: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
    ORDERS: process.env.NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID,
    TRANSACTIONS: process.env.NEXT_PUBLIC_APPWRITE_TRANSACTIONS_COLLECTION_ID,
};


// Define multiple storage bucket IDs
export const BUCKETS = {
    PROFILE_PICTURES: process.env.NEXT_PUBLIC_APPWRITE_PROFILE_PIC_BUCKET_ID,
    DOCUMENTS: process.env.NEXT_PUBLIC_APPWRITE_DOCUMENTS_BUCKET_ID,
};
