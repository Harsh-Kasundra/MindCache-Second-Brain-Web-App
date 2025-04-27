"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema, req, res) => {
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
exports.validateRequest = validateRequest;
