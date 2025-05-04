"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContentSchema = exports.createContentSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(3, { message: "min 3 letters" })
        .max(10, { message: "max 10 letters" }),
    user_email: zod_1.z
        .string()
        .email("Invalid company email")
        .min(1, "Email is required"),
    password: zod_1.z
        .string()
        .min(8, { message: "min 8 letters" })
        .max(20, { message: "max 20 letters" })
        .regex(/\W/, { message: "must contain a special character" })
        .regex(/[A-Z]/, { message: "must contain an uppercase letter" })
        .regex(/[a-z]/, { message: "must contain a lowercase letter" }),
});
exports.createContentSchema = zod_1.z.object({
    content_title: zod_1.z
        .string()
        .min(3, "Title must be at least 3 characters long"),
    content_description: zod_1.z
        .string()
        .min(3, "Title must be at least 3 characters long"),
    content_link: zod_1.z.string().optional(),
    tag: zod_1.z.string(),
    type: zod_1.z.enum([
        "Instagram",
        "Twitter",
        "Youtube",
        "Medium",
        "Image",
        "Text",
    ]),
});
exports.updateContentSchema = zod_1.z.object({
    content_title: zod_1.z
        .string()
        .min(3, "Title must be at least 3 characters long"),
    content_description: zod_1.z
        .string()
        .min(3, "Title must be at least 3 characters long"),
    content_link: zod_1.z.string().optional(),
    tag: zod_1.z.string(),
    type: zod_1.z.enum([
        "Instagram",
        "Twitter",
        "Youtube",
        "Medium",
        "Image",
        "Text",
    ]),
});
