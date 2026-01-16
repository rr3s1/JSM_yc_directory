import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z
        .string()
        .url()
        .refine(async (url) => {
            const urlLower = url.toLowerCase();
            
            // First, check if URL has common image file extensions
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico', '.avif'];
            const hasImageExtension = imageExtensions.some(ext => 
                urlLower.includes(ext.toLowerCase())
            );
            
            // Check for image-related path segments
            const hasImagePath = urlLower.includes('/image') || 
                                urlLower.includes('/img') || 
                                urlLower.includes('/photo') ||
                                urlLower.includes('/picture') ||
                                urlLower.includes('/thumbnail') ||
                                urlLower.includes('thumbnails');

            // If URL looks like an image URL, accept it immediately (avoids CORS issues)
            if (hasImageExtension || hasImagePath) {
                return true;
            }

            // Otherwise, try to verify via HEAD request (may fail due to CORS)
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);
                
                const res = await fetch(url, { 
                    method: "HEAD",
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (res.ok) {
                    const contentType = res.headers.get("content-type");
                    return contentType?.startsWith("image/") ?? false;
                }
                
                return false;
            } catch (error) {
                // If fetch fails due to CORS, network error, or timeout,
                // we cannot verify, so reject URLs that don't match image patterns
                return false;
            }
        }, {
            message: "Please provide a valid image URL"
        }),
    pitch: z.string().min(10),
});
