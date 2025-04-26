import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
    createContentSchema,
    updateContentSchema,
} from "../validations/validation";
import { z } from "zod";
import { validateRequest } from "../utils/validateRequest";

const prisma = new PrismaClient();

/*
 * @route GET /api/v1/content/
 * @desc get all the content
 * @access private
 */
export const getContent = async (res: Response, req: Request): Promise<any> => {
    try {
        const user_id = req.userId;
        const content = await prisma.content.findMany({
            where: {
                user_id: user_id,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Meeting Found successfully ",
            content,
        });
    } catch (error) {
        console.error("Error fetching Content:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/*
 * @route POST /api/v1/content/
 * @desc create new content
 * @access private
 */
export const createContent = async (
    res: Response,
    req: Request
): Promise<any> => {
    try {
        const validatedData = validateRequest(createContentSchema, req, res);
        if (!validatedData) return;
        const { content_title, content_description, content_link, tag } =
            validatedData;

        const content_tag = await prisma.tag.findUnique({
            where: {
                name: tag,
            },
        });
        const newContent = await prisma.content.create({
            data: {
                content_title: content_title,
                content_description: content_description,
                content_link: content_link,
                tag_id: content_tag.tag_id,
                user_id: req.userId,
            },
        });

        return res.status(201).json({
            success: true,
            message: "content created successfully",
            newContent,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ success: false, errors: error.errors });
        }
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

/*
 * @route PUT /api/v1/content/:id
 * @desc Update any specific content
 * @access private
 */
export const updateContent = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const validatedData = validateRequest(updateContentSchema, req, res);
        if (!validatedData) return;
        const { content_title, content_description, content_link, tag } =
            validatedData;
        // Check if content exists
        const existingContent = await prisma.content.findUnique({
            where: { content_id: req.params.content_id },
        });

        const content_tag = await prisma.tag.findUnique({
            where: {
                name: tag,
            },
        });

        if (!existingContent) {
            return res.status(404).json({
                success: false,
                message: "Content not found",
            });
        }
        const updatedContent = await prisma.content.update({
            where: {
                content_id: req.params.content_id,
            },
            data: {
                content_title: content_title,
                content_description: content_description,
                content_link: content_link,
                tag: content_tag.id,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ success: false, errors: error.errors });
        }
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

/*
 * @route DELETE /api/v1/content/:id
 * @desc delete any specific content
 * @access private
 */
export const deleteContent = async (
    req: Request,
    res: Response
): Promise<any> => {
    const content_id = req.body.contentId;
    try {
        // Check if content exists
        const existingContent = await prisma.content.findUnique({
            where: { content_id: content_id },
        });

        if (!existingContent) {
            return res.status(404).json({
                success: false,
                message: "Content not found",
            });
        }
        const deletedContent = await prisma.content.delete({
            where: {
                content_id: content_id,
            },
        });
        return res.status(200).json({
            success: true,
            message: "content deleted successfully",
            deletedContent,
        });
    } catch (error) {
        console.error("Error deleting meeting:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
