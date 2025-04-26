import { z } from "zod";

export const createUserSchema = z.object({
    username: z
        .string()
        .min(3, { message: "min 3 letters" })
        .max(10, { message: "max 10 letters" }),
    user_email: z
        .string()
        .email("Invalid company email")
        .min(1, "Email is required"),
    password: z
        .string()
        .min(8, { message: "min 8 letters" })
        .max(20, { message: "max 20 letters" })
        .regex(/\W/, { message: "must contain a special character" })
        .regex(/[A-Z]/, { message: "must contain an uppercase letter" })
        .regex(/[a-z]/, { message: "must contain a lowercase letter" }),
});

export type createUserType = z.infer<typeof createUserSchema>;

export const createContentSchema = z.object({
    content_title: z
        .string()
        .min(3, "Title must be at least 3 characters long"),
    content_description: z
        .string()
        .min(3, "Title must be at least 3 characters long"),
    content_link: z.string().optional(),
    tag: z.string(),
});

export const updateContentSchema = z.object({
    content_title: z
        .string()
        .min(3, "Title must be at least 3 characters long"),
    content_description: z
        .string()
        .min(3, "Title must be at least 3 characters long"),
    content_link: z.string().optional(),
    tag: z.string(),
});

declare module "express-session" {
    interface SessionData {
        user?: {
            user_id: string;
            user_email: string;
        };
    }
}
