"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.updateContent = exports.createContent = exports.getContent = void 0;
const client_1 = require("@prisma/client");
const validation_1 = require("../validations/validation");
const zod_1 = require("zod");
const validateRequest_1 = require("../utils/validateRequest");
const prisma = new client_1.PrismaClient();
/**
 * @route GET /api/v1/content/
 * @desc get all the content
 * @access private
 */
const getContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.userId;
        const content = yield prisma.content.findMany({
            where: {
                user_id: user_id,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Meeting Found successfully ",
            content,
        });
    }
    catch (error) {
        console.error("Error fetching Content:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.getContent = getContent;
/**
 * @route POST /api/v1/content/
 * @desc create new content
 * @access private
 */
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request:", req);
    console.log("Response:", res);
    try {
        const validatedData = (0, validateRequest_1.validateRequest)(validation_1.createContentSchema, req, res);
        if (!validatedData)
            return;
        const { content_title, content_description, content_link, tag } = validatedData;
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not authenticated",
            });
        }
        const content_tag = yield prisma.tag.findUnique({
            where: {
                name: tag,
            },
        });
        if (!content_tag) {
            return res.status(404).json({
                success: false,
                message: "Tag not Found or Invalid Tag",
            });
        }
        const newContent = yield prisma.content.create({
            data: {
                content_title: content_title,
                content_description: content_description,
                content_link: content_link,
                tag_id: content_tag.tag_id,
                user_id: userId,
            },
        });
        return res.status(201).json({
            success: true,
            message: "content created successfully",
            newContent,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res
                .status(400)
                .json({ success: false, errors: error.errors });
        }
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});
exports.createContent = createContent;
/**
 * @route PUT /api/v1/content/:content_id
 * @desc Update any specific content
 * @access private
 */
const updateContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = (0, validateRequest_1.validateRequest)(validation_1.updateContentSchema, req, res);
        if (!validatedData)
            return;
        const { content_title, content_description, content_link, tag } = validatedData;
        // Check if content exists
        const existingContent = yield prisma.content.findUnique({
            where: { content_id: req.params.content_id },
        });
        const content_tag = yield prisma.tag.findUnique({
            where: {
                name: tag,
            },
        });
        if (!content_tag) {
            return res.status(404).json({
                success: false,
                message: "Tag not Found or Invalid Tag",
            });
        }
        if (!existingContent) {
            return res.status(404).json({
                success: false,
                message: "Content not found",
            });
        }
        const updatedContent = yield prisma.content.update({
            where: {
                content_id: req.params.content_id,
            },
            data: {
                content_title: content_title,
                content_description: content_description,
                content_link: content_link,
                tag_id: content_tag.tag_id,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Content updated successfully",
            updatedContent,
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.z.ZodError) {
            return res
                .status(400)
                .json({ success: false, errors: error.errors });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error,
        });
    }
});
exports.updateContent = updateContent;
/**
 * @route DELETE /api/v1/content/:content_id
 * @desc delete any specific content
 * @access private
 */
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content_id = req.params.content_id;
    try {
        // Check if content exists
        const existingContent = yield prisma.content.findUnique({
            where: { content_id: content_id },
        });
        if (!existingContent) {
            return res.status(404).json({
                success: false,
                message: "Content not found",
            });
        }
        const deletedContent = yield prisma.content.delete({
            where: {
                content_id: content_id,
            },
        });
        return res.status(200).json({
            success: true,
            message: "content deleted successfully",
            deletedContent,
        });
    }
    catch (error) {
        console.error("Error deleting meeting:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.deleteContent = deleteContent;
