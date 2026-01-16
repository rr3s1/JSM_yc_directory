"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { formSchema } from "@/lib/validation";
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

    const formValues = {
        title: String(form.get("title") || "").trim(),
        description: String(form.get("description") || "").trim(),
        category: String(form.get("category") || "").trim(),
        link: String(form.get("link") || "").trim(),
        pitch: (pitch || "").trim(),
    };

    try {
        const validated = await formSchema.parseAsync(formValues);

        const slug = slugify(validated.title, { lower: true, strict: true });

        const startup = {
            title: validated.title,
            description: validated.description,
            category: validated.category,
            image: validated.link,
            slug: {
                _type: "slug",
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            },
            views: 0,
            pitch: validated.pitch,
        };

        const result = await writeClient.create({ _type: "startup", ...startup });

        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS",
        });
    } catch (error) {
        console.error("Validation or Sanity Mutation Error:", error);

        if (error && typeof error === "object" && "issues" in error) {
            const zodError = error as { issues: Array<{ path: string[]; message: string }> };
            const errorMessages = zodError.issues.map(issue => {
                const field = issue.path.join(".");
                return `${field}: ${issue.message}`;
            });
            return parseServerActionResponse({
                error: errorMessages.join("; "),
                status: "ERROR",
            });
        }

        return parseServerActionResponse({
            error: error instanceof Error ? error.message : "An unexpected error occurred during creation",
            status: "ERROR",
        });
    }
};
