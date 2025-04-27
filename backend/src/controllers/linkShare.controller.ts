import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import { Request, Response } from "express";

const prisma = new PrismaClient();

/**
 * @route POST /api/v1/share
 * @desc Create a shareable link for the user
 * @access Private
 */
export const createLink = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const hash = randomBytes(15).toString("hex");

        const existingLink = await prisma.link.findUnique({
            where: { user_id: userId },
        });

        if (existingLink) {
            const link = await prisma.link.update({
                where: { user_id: userId },
                data: { hash },
            });
            return res.status(200).json({
                success: true,
                message: "link has been updated",
                link,
            });
        }

        const link = await prisma.link.create({
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
    } catch (error) {
        console.error("Error processing share link:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while creating your request",
        });
    }
};

/**
 * @route DELETE /api/v1/share
 * @desc delete all shareable link for the user
 * @access private
 */
export const deleteLink = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.userId;

        const existingLink = await prisma.link.findUnique({
            where: { user_id: userId },
        });

        if (!existingLink) {
            return res.status(404).json({
                success: false,
                message: "No link found to remove",
            });
        }

        // Delete the link
        const deletedLinks = await prisma.link.delete({
            where: { user_id: userId },
        });

        return res.status(200).json({
            success: true,
            message: "all the shareabla links are deleted",
            deletedLinks,
        });
    } catch (error) {
        console.error("Error deleting share link:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while deleting your links",
        });
    }
};

/**
 * @route GET /api/v1/share/:sharelink
 * @desc Get content based on share link
 * @access public
 */
export const getLinkContent = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { sharelink } = req.params;
    try {
        const link = await prisma.link.findUnique({
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

        const content = await prisma.content.findMany({
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
    } catch (error) {
        console.error("Error fetching link content:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the link content",
        });
    }
};
