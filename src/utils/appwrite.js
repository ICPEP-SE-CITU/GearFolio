import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("http://localhost/v1") // Replace with your Appwrite instance URL
  .setProject("67eccfa10005a956adb9"); // Replace with your Appwrite Project ID

const databases = new Databases(client);

console.log(databases);
export { client, databases };
