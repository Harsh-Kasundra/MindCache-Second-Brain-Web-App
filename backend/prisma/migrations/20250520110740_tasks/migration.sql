-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Task" (
    "task_id" TEXT NOT NULL,
    "task_title" TEXT NOT NULL,
    "task_description" TEXT,
    "task_due_date" TIMESTAMP(3) NOT NULL,
    "task_due_time" TIMESTAMP(3),
    "task_type" TEXT NOT NULL,
    "task_priority" "TaskPriority" NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_id")
);
