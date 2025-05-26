import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import {
    createContentSchema,
    updateContentSchema,
} from "../validations/validation";
import {z} from "zod";
import {validateRequest} from "../utils/validateRequest";

const prisma = new PrismaClient();

/**
 * @route GET /api/v1/content/?limit=3sort=desc
 * @desc get all the content
 * @access private
 */
export const getContent = async (req: Request, res: Response): Promise<any> => {
    try {
        const user_id = req.userId;

        // Optional query parameters
        const limit = req.query.limit
            ? parseInt(req.query.limit as string, 10)
            : undefined;
        const sort = req.query.sort === "desc" ? "desc" : "asc";

        const content = await prisma.content.findMany({
            where: {user_id},
            orderBy: {
                createdAt: sort,
            },
            take: limit,
            include: {
                Type: true,
                tags: true,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Content found successfully",
            content,
        });
    } catch (error) {
        console.error("Error fetching content:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * @route POST /api/v1/content/
 * @desc create new content
 * @access private
 */
export const createContent = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const validatedData = validateRequest(createContentSchema, req, res);
        if (!validatedData) return;

        const {content_title, content_description, content_link, tag, type} =
            validatedData;

        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const content_type = await prisma.type.findFirst({
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

        const content_tag = await prisma.tag.findFirst({
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

        const newContent = await prisma.content.create({
            data: {
                content_title,
                content_description,
                content_link,
                tags: {connect: [{tag_id: content_tag.tag_id}]},
                type_id: content_type.type_id,
                user_id: userId,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Content created successfully",
            newContent,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
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
};

/**
 * @route PUT /api/v1/content/:content_id
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

        const {content_title, content_description, content_link, tag, type} =
            validatedData;

        const existingContent = await prisma.content.findUnique({
            where: {content_id: req.params.content_id},
        });

        if (!existingContent) {
            return res.status(404).json({
                success: false,
                message: "Content not found",
            });
        }

        const content_tag = await prisma.tag.findFirst({
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

        const content_type = await prisma.type.findFirst({
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

        const updatedContent = await prisma.content.update({
            where: {
                content_id: req.params.content_id,
            },
            data: {
                content_title,
                content_description,
                content_link,
                tags: {connect: [{tag_id: content_tag.tag_id}]},
                type_id: content_type.type_id,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Content updated successfully",
            updatedContent,
        });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
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
};

/**
 * @route DELETE /api/v1/content/:content_id
 * @desc delete any specific content
 * @access private
 */
export const deleteContent = async (
    req: Request,
    res: Response
): Promise<any> => {
    const content_id = req.params.content_id;
    try {
        // Check if content exists
        const existingContent = await prisma.content.findUnique({
            where: {content_id: content_id},
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
        console.error("Error deleting Content:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * @route GET /api/v1/content/contentStats
 * @desc get the count of the content
 * @access private
 */
export const contentStats = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const total = await prisma.content.count();

        const getCount = (type: string) =>
            prisma.content.count({
                where: {
                    Type: {
                        type_name: type as any,
                    },
                },
            });

        const [instagram, twitter, youtube, medium, text, image] =
            await Promise.all([
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
            counts: {total, instagram, twitter, youtube, medium, text, image},
        });
    } catch (error) {
        console.error("Error Counting content:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
