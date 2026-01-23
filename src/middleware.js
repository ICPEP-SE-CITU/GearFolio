import { NextResponse } from "next/server";

export async function middleware(request) {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

  const cookieHeader = request.headers.get("cookie") || "";
  const sessionName = `a_session_${projectId}`;
  const legacySessionName = `a_session_${projectId}_legacy`;

  const match = cookieHeader.match(new RegExp(`${sessionName}=([^;]+)`)) ||
                cookieHeader.match(new RegExp(`${legacySessionName}=([^;]+)`));

  const sessionValue = match?.[1];

  if (request.url.pathname === '/specific-page' || request.url.pathname === '/login_signup') {
    return NextResponse.next();
  } else if (!sessionValue) {
    return NextResponse.redirect(new URL("/login_signup", request.url));
  }

  const res = await fetch(`${endpoint}/account`, {
    method: "GET",
    headers: {
      "X-Appwrite-Project": projectId,
      "Content-Type": "application/json",
      "Cookie": `${match[0]}`,
    },
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/login_signup", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
