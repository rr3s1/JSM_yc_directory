import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
// Imports the after function to handle post-response tasks
import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
    // Fetches the current view count with SSR (no CDN) for real-time accuracy
    const { views: totalViews } = await client
        .withConfig({ useCdn: false })
        .fetch(STARTUP_VIEWS_QUERY, { id });

    // Schedules the write operation to happen after the response is sent
    // This prevents the write operation from blocking the UI rendering
    if (typeof after === "function") {
        after(
            async () =>
                await writeClient
                    .patch(id) // Targets the specific document by ID
                    .inc({ views: 1 }) // Atomically increments the view count
                    .commit(), // Commits the transaction to Sanity
        );
    } else {
        // Fallback: fire-and-forget pattern if after is not available
        // This doesn't block the response but runs concurrently
        writeClient
            .patch(id)
            .inc({ views: 1 }) // Atomically increments the view count
            .commit()
            .catch(() => {
                // Silently fail - view counting is non-critical
            });
    }

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <p className="view-text">
                <span className="font-black">Views: {totalViews}</span>
            </p>
        </div>
    );
};
export default View;
