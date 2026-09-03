import { z } from "zod";

export const incidentSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(255, "Title cannot exceed 255 characters"),

    description: z
        .string()
        .min(10, "Description is required and must be at least 10 characters long")
        .max(65535, "Description cannot exceed 65535 characters"),
});

export const patchIncidentSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(255, "Title cannot exceed 255 characters")
        .optional(),
    description: z
        .string()
        .min(10, "Description is required and must be at least 10 characters long")
        .max(65535, "Description cannot exceed 65535 characters")
        .optional(),
    assignedToUserId: z
        .string()
        .min(1, "AssignedTo user ID is required")
        .max(255, "AssignedTo user ID cannot exceed 255 characters")
        .optional()
        .nullable()
        
});
