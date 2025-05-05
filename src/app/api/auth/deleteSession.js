import { appwrite } from "@/appwrite/config";

export async function deleteSession() {
  try {
    const account = await appwrite.getAccount();
    await account.deleteSession('current');
    console.log('Session deleted successfully');
  } catch (error) {
    console.error('Error deleting session:', error.message);
  }
}