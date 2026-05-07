import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const isProtectedRoute = createRouteMatcher([
    '/:locale/checkout',
    '/:locale/orders',
    '/:locale/orders/(.*)',
    '/:locale/checkout/success',
])

const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
  
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // i18n
    '/', 
    '/(ar|en)/:path*'
  ],
};