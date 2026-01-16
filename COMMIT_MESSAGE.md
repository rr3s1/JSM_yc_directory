refactor: optimize auth flow and fix code quality issues

- Remove redundant auth() call in page.tsx, use cached session helper
- Remove debug console.log statement from production code
- Fix Sanity image import to use public API (@sanity/image-url)
- Clean up extra blank lines in queries.ts

BREAKING CHANGE: None

Files changed:
- app/(root)/page.tsx: Replace direct auth() with getCachedSession(), remove debug logging
- sanity/lib/image.ts: Use public API import for SanityImageSource type
- sanity/lib/queries.ts: Remove unnecessary blank lines

Additional fixes still pending:
- auth.ts: Add error handling for user creation, token.id fallback
- next-auth.d.ts: Fix JWT module declaration for NextAuth v5
- package.json: Downgrade next-auth from v5 beta to v4 stable
- Update auth route handler and Navbar for v4 compatibility
- Replace Object.assign with spread syntax in session callback
