"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
    state: any,
    form: FormData,
    pitch: string,
) => {
    const session = await auth();

    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });

    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const category = form.get("category") as string;
    const link = form.get("link") as string;

    if (!title) {
        return parseServerActionResponse({
            error: "Title is required",
            status: "ERROR",
        });
    }

    const slug = slugify(title, { lower: true, strict: true });

    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: "slug",
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            },
            views: 0,
            pitch,
        };

        const result = await writeClient.create({ _type: "startup", ...startup });

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS",
        });
    } catch (error) {
        console.error("Sanity Mutation Error:", error);

        return parseServerActionResponse({
            error: error instanceof Error ? error.message : "An unexpected error occurred during creation",
            status: "ERROR",
        });
    }
};
