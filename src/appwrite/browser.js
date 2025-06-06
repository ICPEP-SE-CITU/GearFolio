import { Client, Account, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);


export async function  deleteAppwriteSession() {
  await account.deleteSession('current');
}



export {  client, account, databases, ID };
