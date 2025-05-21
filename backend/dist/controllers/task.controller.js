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
exports.markDoneTask = exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const validateRequest_1 = require("../utils/validateRequest");
const validation_1 = require("../validations/validation");
const prisma = new client_1.PrismaClient();
/**
 * @route GET /api/v1/task
 * @desc get all the task
 * @access private
 */
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.userId;
        const tasks = yield prisma.task.findMany({
            where: { user_id },
            orderBy: { task_due_date: "asc" },
        });
        res.status(200).json({ success: true, tasks });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.getTasks = getTasks;
/**
 * @route POST /api/v1/task
 * @desc create new task
 * @access private
 */
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = (0, validateRequest_1.validateRequest)(validation_1.createTaskSchema, req, res);
        if (!validatedData)
            return;
        const { task_title, task_description, task_due_date, task_due_time, task_type, task_priority, } = validatedData;
        const user_id = req.userId;
        if (!user_id) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }
        const newTask = yield prisma.task.create({
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
        res.status(201).json({ success: true, task: newTask });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ success: false, errors: error.errors });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
});
exports.createTask = createTask;
/**
 * @route PUT /api/v1/task/:task_id
 * @desc Update any specific task
 * @access private
 */
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = (0, validateRequest_1.validateRequest)(validation_1.updateTaskSchema, req, res);
        if (!validatedData)
            return;
        const { task_id } = req.params;
        const existingTask = yield prisma.task.findUnique({ where: { task_id } });
        if (!existingTask) {
            return res
                .status(404)
                .json({ success: false, message: "Task not found" });
        }
        const updatedTask = yield prisma.task.update({
            where: { task_id },
            data: Object.assign(Object.assign({}, validatedData), { task_due_date: validatedData.task_due_date
                    ? new Date(validatedData.task_due_date)
                    : undefined, task_due_time: validatedData.task_due_time
                    ? new Date(`1970-01-01T${validatedData.task_due_time}Z`)
                    : undefined }),
        });
        res.status(200).json({ success: true, task: updatedTask });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ success: false, errors: error.errors });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
});
exports.updateTask = updateTask;
/**
 * @route DELETE /api/v1/task/:task_id
 * @desc delete any specific content
 * @access private
 */
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_id } = req.params;
        const existingTask = yield prisma.task.findUnique({ where: { task_id } });
        if (!existingTask) {
            return res
                .status(404)
                .json({ success: false, message: "Task not found" });
        }
        const deletedTask = yield prisma.task.delete({ where: { task_id } });
        res.status(200).json({
            success: true,
            message: "Task deleted",
            deletedTask,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.deleteTask = deleteTask;
/**
 * @route PATCH /api/v1/task/:task_id/done
 * @desc Mark as done to any specific task
 * @access private
 */
const markDoneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_id } = req.params;
        const existingTask = yield prisma.task.findUnique({ where: { task_id } });
        if (!existingTask) {
            return res
                .status(404)
                .json({ success: false, message: "Task not found" });
        }
        const markedTask = yield prisma.task.update({
            where: { task_id },
            data: {
                completed: true,
            },
        });
        res.status(200).json({
            success: true,
            message: "Task marked as completed",
            task: markedTask,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.markDoneTask = markDoneTask;
