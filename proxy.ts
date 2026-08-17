import { NextRequest, NextResponse } from "next/server";

// Gates /admin behind HTTP Basic Auth. Set ADMIN_USERNAME and ADMIN_PASSWORD
// in your Vercel project's environment variables.
export function proxy(req: NextRequest) {
  const adminUser = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return new NextResponse("Admin area is not configured.", { status: 503 });
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf-8");
    const [user, password] = decoded.split(":");
    if (user === adminUser && password === adminPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
