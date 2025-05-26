/*
  Warnings:

  - You are about to drop the column `type_id` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content_type` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_type_id_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "type_id",
ADD COLUMN     "content_type" "ContentTypes" NOT NULL;

-- DropTable
DROP TABLE "Type";
