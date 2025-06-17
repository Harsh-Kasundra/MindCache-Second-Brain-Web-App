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
exports.contentStats = exports.deleteContent = exports.updateContent = exports.createContent = exports.getContent = void 0;
const client_1 = require("@prisma/client");
const validation_1 = require("../validations/validation");
const zod_1 = require("zod");
const validateRequest_1 = require("../utils/validateRequest");
const prisma = new client_1.PrismaClient();
/**
 * @route GET /api/v1/content/?limit=3sort=desc
 * @desc get all the content
 * @access private
 */
const getContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.userId;
        const limit = parseInt(req.query.limit || "6", 10);
        const page = parseInt(req.query.page || "1", 10);
        const skip = (page - 1) * limit;
        const sort = req.query.sort === "desc" ? "desc" : "asc";
        const contentType = req.query.type;
        const content = yield prisma.content.findMany({
            where: Object.assign({ user_id }, (contentType && {
                Type: {
                    is: {
                        type_name: contentType,
                    },
                },
            })),
            orderBy: { createdAt: sort },
            skip,
            take: limit,
            include: { Type: true, tags: true },
        });
        const totalCount = yield prisma.content.count({
            where: Object.assign({ user_id }, (contentType && {
                Type: {
                    is: {
                        type_name: contentType,
                    },
                },
            })),
        });
        return res.status(200).json({
            success: true,
            message: "Content found successfully",
            content,
            totalCount,
        });
    }
    catch (error) {
        console.error("Error fetching content:", error);
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
    try {
        const validatedData = (0, validateRequest_1.validateRequest)(validation_1.createContentSchema, req, res);
        if (!validatedData)
            return;
        const { content_title, content_description, content_link, tag, type } = validatedData;
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not authenticated",
            });
        }
        const content_type = yield prisma.type.findFirst({
            where: {
                type_name: type,
            },
        });
        if (!content_type) {
            return res.status(404).json({
                success: false,
                message: "Type not Found or Invalid Type",
            });
        }
        const content_tag = yield prisma.tag.findFirst({
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
                content_title,
                content_description,
                content_link,
                tags: { connect: [{ tag_id: content_tag.tag_id }] },
                type_id: content_type.type_id,
                user_id: userId,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Content created successfully",
            newContent,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.errors,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
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
        const { content_title, content_description, content_link, tag, type } = validatedData;
        const existingContent = yield prisma.content.findUnique({
            where: { content_id: req.params.content_id },
        });
        if (!existingContent) {
            return res.status(404).json({
                success: false,
                message: "Content not found",
            });
        }
        const content_tag = yield prisma.tag.findFirst({
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
        const content_type = yield prisma.type.findFirst({
            where: {
                type_name: type,
            },
        });
        if (!content_type) {
            return res.status(404).json({
                success: false,
                message: "Type not Found or Invalid Type",
            });
        }
        const updatedContent = yield prisma.content.update({
            where: {
                content_id: req.params.content_id,
            },
            data: {
                content_title,
                content_description,
                content_link,
                tags: { connect: [{ tag_id: content_tag.tag_id }] },
                type_id: content_type.type_id,
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
            return res.status(400).json({
                success: false,
                errors: error.errors,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
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
        console.error("Error deleting Content:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.deleteContent = deleteContent;
/**
 * @route GET /api/v1/content/contentStats
 * @desc get the count of the content
 * @access private
 */
const contentStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield prisma.content.count();
        const getCount = (type) => prisma.content.count({
            where: {
                Type: {
                    type_name: type,
                },
            },
        });
        const [instagram, twitter, youtube, medium, text, image] = yield Promise.all([
            getCount("Instagram"),
            getCount("Twitter"),
            getCount("Youtube"),
            getCount("Medium"),
            getCount("Text"),
            getCount("Image"),
        ]);
        return res.status(200).json({
            success: true,
            message: "Content stats fetched successfully",
            counts: { total, instagram, twitter, youtube, medium, text, image },
        });
    }
    catch (error) {
        console.error("Error Counting content:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.contentStats = contentStats;
