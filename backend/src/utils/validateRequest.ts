// utils/validateRequest.ts
import { ZodSchema } from "zod";
import { Request, Response } from "express";

export const validateRequest = <T>(
    schema: ZodSchema<T>,
    req: Request,
    res: Response
): T | null => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            success: false,
            errors: result.error.errors,
        });
        return null;
    }

    return result.data;
};
