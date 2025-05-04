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
exports.deleteTag = exports.updateTag = exports.createTag = exports.getTags = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * @route GET /api/v1/tags
 * @desc Get all tags
 * @access private
 */
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield prisma.tag.findMany();
        return res.status(200).json({
            success: true,
            message: "Tags retrieved successfully",
            tags,
        });
    }
    catch (error) {
        console.error("Error fetching tags:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.getTags = getTags;
/**
 * @route POST /api/v1/tags
 * @desc Create a new tag
 * @access private
 */
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        // Manually validate the input
        if (!name || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Tag name is required",
            });
        }
        // Check if tag already exists
        const existingTag = yield prisma.tag.findFirst({
            where: {
                name,
            },
        });
        if (existingTag) {
            return res.status(400).json({
                success: false,
                message: "Tag already exists",
            });
        }
        // Create a new tag
        const newTag = yield prisma.tag.create({
            data: {
                name,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Tag created successfully",
            newTag,
        });
    }
    catch (error) {
        console.error("Error creating tag:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.createTag = createTag;
/**
 * @route PUT /api/v1/tags/:tag_id
 * @desc Update a specific tag
 * @access private
 */
const updateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        // Manually validate the input
        if (!name || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Tag name is required",
            });
        }
        // Find the tag
        const existingTag = yield prisma.tag.findUnique({
            where: {
                tag_id: req.params.tag_id,
            },
        });
        if (!existingTag) {
            return res.status(404).json({
                success: false,
                message: "Tag not found",
            });
        }
        // Update the tag
        const updatedTag = yield prisma.tag.update({
            where: {
                tag_id: req.params.tag_id,
            },
            data: {
                name,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Tag updated successfully",
            updatedTag,
        });
    }
    catch (error) {
        console.error("Error updating tag:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.updateTag = updateTag;
/**
 * @route DELETE /api/v1/tags/:tag_id
 * @desc Delete a specific tag
 * @access private
 */
const deleteTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagId = req.params.tag_id;
        // Find the tag
        const existingTag = yield prisma.tag.findUnique({
            where: {
                tag_id: tagId,
            },
        });
        if (!existingTag) {
            return res.status(404).json({
                success: false,
                message: "Tag not found",
            });
        }
        // Delete the tag
        const deletedTag = yield prisma.tag.delete({
            where: {
                tag_id: tagId,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Tag deleted successfully",
            deletedTag,
        });
    }
    catch (error) {
        console.error("Error deleting tag:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.deleteTag = deleteTag;
