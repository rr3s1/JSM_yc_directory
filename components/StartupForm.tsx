"use client";

import React, { useActionState, useState } from 'react';
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { createPitch } from "@/lib/actions";


const StartupForm = () => {
    // Local state for validation errors and pitch content
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const { toast } = useToast();
    const router = useRouter();

    // Form submission handler used by useActionState
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            setErrors({});

            // Extract and construct form values object
            const formValues = {
                title: String(formData.get("title") || "").trim(),
                description: String(formData.get("description") || "").trim(),
                category: String(formData.get("category") || "").trim(),
                link: String(formData.get("link") || "").trim(),
                pitch: (pitch || "").trim(),
            };

            // Validate values against Zod schema
            await formSchema.parseAsync(formValues);

            const result = await createPitch(prevState, formData, pitch);

            if (result.status === "SUCCESS") {
                toast({
                    title: "Success",
                    description: "Your startup pitch has been created successfully",
                });

                router.push(`/startup/${result._id}`);
            } else {
                toast({
                    title: "Error",
                    description: result.error || "An unexpected error has occurred",
                    variant: "destructive",
                });
            }

            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                const formattedErrors: Record<string, string> = {};
                
                Object.keys(fieldErrors).forEach((key) => {
                    const messages = fieldErrors[key];
                    if (messages && messages.length > 0) {
                        formattedErrors[key] = messages[0];
                    }
                });

                setErrors(formattedErrors);

                toast({
                    title: "Error",
                    description: "Please check your inputs and try again",
                    variant: "destructive",
                });

                return { ...prevState, error: "Validation failed", status: "ERROR" };
            }

            // Handle unexpected errors
            toast({
                title: "Error",
                description: "An unexpected error has occurred",
                variant: "destructive",
            });

            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR",
            };
        }
    };

    // useActionState hook to manage form state and submission
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    });

    return (
        // Bind the form action to the hook's returned action
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">
                    Title
                </label>
                <Input
                    id="title"
                    name="title"
                    className="startup-form_input"
                    required
                    placeholder="Startup Title"
                />
                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">
                    Description
                </label>
                <Input
                    id="description"
                    name="description"
                    className="startup-form_input"
                    required
                    placeholder="Brief description of your startup (20-500 characters)"
                />
                {errors.description && (
                    <p className="startup-form_error">{errors.description}</p>
                )}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">
                    Category
                </label>
                <Input
                    id="category"
                    name="category"
                    className="startup-form_input"
                    required
                    placeholder="Startup Category (Tech, Health, Education...)"
                />
                {errors.category && (
                    <p className="startup-form_error">{errors.category}</p>
                )}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label">
                    Image URL
                </label>
                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    required
                    placeholder="Startup Image URL"
                />
                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">
                    Pitch
                </label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder: "Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />
                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>

            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className="size-6 ml-2" />
            </Button>
        </form>
    );
};

export default StartupForm;