
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient, createSessionClient } from "@/appwrite/config";
import { NextResponse , request } from 'next/server';
import deleteSession from "./deleteSession";

const auth = {
    user: null,
    sessionCookie: null,
    getUser: async () => {
        auth.sessionCookie = cookies().get("session");
        try {
            const { account } = await createSessionClient(
                auth.sessionCookie.value
            );
            auth.user = await account.getSession('current');
        } catch {
            auth.user = null;
            auth.sessionCookie = null;
        }
        return auth.user;
    },

    createSession: async (formData) => {
        

        const data = Object.fromEntries(formData);
        const { email, password } = data;
        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        cookies().set("session", session.secret, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            expires: new Date(session.expire),
            path: "/dashboard",
        });

        redirect("/dashboard");
    },

    deleteSession: deleteSession,
};

export default auth;