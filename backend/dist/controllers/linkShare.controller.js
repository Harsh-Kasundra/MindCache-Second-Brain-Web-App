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
exports.getLinkContent = exports.deleteLink = exports.createLink = void 0;
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const prisma = new client_1.PrismaClient();
/**
 * @route POST /api/v1/share
 * @desc Create a shareable link for the user
 * @access Private
 */
const createLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not authenticated",
            });
        }
        const hash = (0, crypto_1.randomBytes)(15).toString("hex");
        const existingLink = yield prisma.link.findUnique({
            where: { user_id: userId },
        });
        if (existingLink) {
            const link = yield prisma.link.update({
                where: { user_id: userId },
                data: { hash },
            });
            return res.status(200).json({
                success: true,
                message: "link has been updated",
                link,
            });
        }
        const link = yield prisma.link.create({
            data: {
                hash,
                user_id: userId,
            },
        });
        return res.status(201).json({
            success: true,
            message: "link has been created",
            link,
        });
    }
    catch (error) {
        console.error("Error processing share link:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while creating your request",
        });
    }
});
exports.createLink = createLink;
/**
 * @route DELETE /api/v1/share
 * @desc delete all shareable link for the user
 * @access private
 */
const deleteLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const existingLink = yield prisma.link.findUnique({
            where: { user_id: userId },
        });
        if (!existingLink) {
            return res.status(404).json({
                success: false,
                message: "No link found to remove",
            });
        }
        // Delete the link
        const deletedLinks = yield prisma.link.delete({
            where: { user_id: userId },
        });
        return res.status(200).json({
            success: true,
            message: "all the shareabla links are deleted",
            deletedLinks,
        });
    }
    catch (error) {
        console.error("Error deleting share link:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while deleting your links",
        });
    }
});
exports.deleteLink = deleteLink;
/**
 * @route GET /api/v1/share/:sharelink
 * @desc Get content based on share link
 * @access public
 */
const getLinkContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sharelink } = req.params;
    try {
        const link = yield prisma.link.findUnique({
            where: {
                hash: sharelink,
            },
            include: {
                user: true,
            },
        });
        if (!link) {
            return res.status(404).json({
                success: false,
                message: "Invalid link, link not found",
            });
        }
        const content = yield prisma.content.findMany({
            where: {
                user_id: link.user_id,
            },
        });
        if (!content.length) {
            return res.status(404).json({
                success: false,
                message: "No content found for this user",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Content successfully fetched",
            username: link.user.username,
            content: content,
        });
    }
    catch (error) {
        console.error("Error fetching link content:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the link content",
        });
    }
});
exports.getLinkContent = getLinkContent;
