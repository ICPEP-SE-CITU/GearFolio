// lib/config/appwrite.ts
import { Client, Databases, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, storage };
