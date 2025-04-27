/*
  Warnings:

  - You are about to drop the column `link` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Content` table. All the data in the column will be lost.
  - Added the required column `content_description` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_title` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "link",
DROP COLUMN "title",
DROP COLUMN "type",
ADD COLUMN     "content_description" TEXT NOT NULL,
ADD COLUMN     "content_link" TEXT,
ADD COLUMN     "content_title" TEXT NOT NULL;
