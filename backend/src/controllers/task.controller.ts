import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import {z} from "zod";
import {validateRequest} from "../utils/validateRequest";
import {createTaskSchema, updateTaskSchema} from "../validations/validation";

const prisma = new PrismaClient();

/**
 * @route GET /api/v1/task
 * @desc get all the task
 * @access private
 */
export const getTasks = async (req: Request, res: Response): Promise<any> => {
    try {
        const user_id = req.userId;

        const tasks = await prisma.task.findMany({
            where: {user_id},
            orderBy: {task_due_date: "asc"},
        });

        res.status(200).json({success: true, tasks});
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * @route POST /api/v1/task
 * @desc create new task
 * @access private
 */
export const createTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const validatedData = validateRequest(createTaskSchema, req, res);
        if (!validatedData) return;

        const {
            task_title,
            task_description,
            task_due_date,
            task_due_time,
            task_type,
            task_priority,
        } = validatedData;

        const user_id = req.userId;
        if (!user_id) {
            return res
                .status(401)
                .json({success: false, message: "Unauthorized"});
        }

        const newTask = await prisma.task.create({
            data: {
                task_title,
                task_description,
                task_due_date: new Date(task_due_date),
                task_due_time: task_due_time
                    ? new Date(`1970-01-01T${task_due_time}Z`)
                    : undefined,
                task_type,
                task_priority,
                user_id,
            },
        });

        res.status(201).json({success: true, task: newTask});
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({success: false, errors: error.errors});
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
};

/**
 * @route PUT /api/v1/task/:task_id
 * @desc Update any specific task
 * @access private
 */
export const updateTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const validatedData = validateRequest(updateTaskSchema, req, res);
        if (!validatedData) return;

        const {task_id} = req.params;

        const existingTask = await prisma.task.findUnique({where: {task_id}});
        if (!existingTask) {
            return res
                .status(404)
                .json({success: false, message: "Task not found"});
        }

        const updatedTask = await prisma.task.update({
            where: {task_id},
            data: {
                ...validatedData,
                task_due_date: validatedData.task_due_date
                    ? new Date(validatedData.task_due_date)
                    : undefined,
                task_due_time: validatedData.task_due_time
                    ? new Date(`1970-01-01T${validatedData.task_due_time}Z`)
                    : undefined,
            },
        });

        res.status(200).json({success: true, task: updatedTask});
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({success: false, errors: error.errors});
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
};

/**
 * @route DELETE /api/v1/task/:task_id
 * @desc delete any specific content
 * @access private
 */
export const deleteTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const {task_id} = req.params;

        const existingTask = await prisma.task.findUnique({where: {task_id}});
        if (!existingTask) {
            return res
                .status(404)
                .json({success: false, message: "Task not found"});
        }

        const deletedTask = await prisma.task.delete({where: {task_id}});

        res.status(200).json({
            success: true,
            message: "Task deleted",
            deletedTask,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * @route PATCH /api/v1/task/:task_id/done
 * @desc Mark as done to any specific task
 * @access private
 */
export const markDoneTask = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const {task_id} = req.params;

        const existingTask = await prisma.task.findUnique({where: {task_id}});
        if (!existingTask) {
            return res
                .status(404)
                .json({success: false, message: "Task not found"});
        }

        const markedTask = await prisma.task.update({
            where: {task_id},
            data: {
                completed: true,
            },
        });

        res.status(200).json({
            success: true,
            message: "Task marked as completed",
            task: markedTask,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
