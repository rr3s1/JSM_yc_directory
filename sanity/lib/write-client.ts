// Enforces that this file can only be imported in Server Components/Functions
import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";

// Creates a Sanity client specifically for write operations
// Token is optional - write operations will fail if not provided
export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Write operations should bypass the CDN
    ...(token && { token }), // Includes the secure API token with Editor permissions (if provided)
});