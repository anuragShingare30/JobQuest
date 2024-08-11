import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// public routes in our case '/'
const isPublicRoute = createRouteMatcher(['/']);
const isProtectedRoute = createRouteMatcher([
  '/chat(.*)',
  '/addjob(.*)',
  '/jobs(.*)',
  '/stats(.*)',
]);


export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};