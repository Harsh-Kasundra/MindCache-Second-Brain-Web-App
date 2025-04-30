import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

/**
 * @route GET /api/v1/tags
 * @desc Get all tags
 * @access private
 */
export const getTags = async (req: Request, res: Response): Promise<any> => {
    try {
        const tags = await prisma.tag.findMany();
        return res.status(200).json({
            success: true,
            message: "Tags retrieved successfully",
            tags,
        });
    } catch (error) {
        console.error("Error fetching tags:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * @route POST /api/v1/tags
 * @desc Create a new tag
 * @access private
 */
export const createTag = async (req: Request, res: Response): Promise<any> => {
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
        const existingTag = await prisma.tag.findFirst({
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
        const newTag = await prisma.tag.create({
            data: {
                name,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Tag created successfully",
            newTag,
        });
    } catch (error) {
        console.error("Error creating tag:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * @route PUT /api/v1/tags/:tag_id
 * @desc Update a specific tag
 * @access private
 */
export const updateTag = async (req: Request, res: Response): Promise<any> => {
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
        const existingTag = await prisma.tag.findUnique({
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
        const updatedTag = await prisma.tag.update({
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
    } catch (error) {
        console.error("Error updating tag:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * @route DELETE /api/v1/tags/:tag_id
 * @desc Delete a specific tag
 * @access private
 */
export const deleteTag = async (req: Request, res: Response): Promise<any> => {
    try {
        const tagId = req.params.tag_id;

        // Find the tag
        const existingTag = await prisma.tag.findUnique({
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
        const deletedTag = await prisma.tag.delete({
            where: {
                tag_id: tagId,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Tag deleted successfully",
            deletedTag,
        });
    } catch (error) {
        console.error("Error deleting tag:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
