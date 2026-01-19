/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import StudioPageClient from './StudioPageClient'

// These exports must come from a Server Component, so they live here
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <StudioPageClient />
}

