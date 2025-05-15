import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      /**
       * This function is called on every request to protected routes defined
       * in the middleware(middleware.ts). It checks if the user is authenticated
       * before page rendering and handles access control by redirecting
       * unauthenticated users or authenticated users to appropriate routes
       * (e.g., `/dashboard`).
       */

      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true; //"If the user is authenticated and tries to access /dashboard, we allow access."

        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl)); // If the user is authenticated but not on /dashboard, redirect them there
      }

      return true; // For all other cases (if on a different page and the user is not authenticated), allow access
    },
  },
  providers: [], // empty array for now
} satisfies NextAuthConfig;
