"use server";
import {request} from "next/server";
import { createSessionClient } from "@/appwrite/config";
import { NextResponse } from "next/server";



const deleteSession = async (request) => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession('current');
  } catch (error) {
    console.error("Error deleting session in Appwrite:", error.message);
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const redirectUrl = new URL("/login_signup", baseUrl);
  return NextResponse.redirect(redirectUrl, {
    headers: {
      "Set-Cookie": "session=; Max-Age=0; Secure; SameSite=Strict",
    },
  });
};

export default deleteSession;