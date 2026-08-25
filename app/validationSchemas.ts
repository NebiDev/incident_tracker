import { z } from "zod";

export const createIncidentSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(255, "Title cannot exceed 255 characters"),

    description: z
        .string()
        .min(10, "Description is required and must be at least 10 characters long")
        .max(255, "Description cannot exceed 255 characters"),
});
