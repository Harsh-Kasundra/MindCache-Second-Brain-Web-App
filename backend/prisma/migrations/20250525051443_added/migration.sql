/*
  Warnings:

  - You are about to drop the column `content_type` on the `Content` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "content_type",
ADD COLUMN     "type_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Type" (
    "type_id" TEXT NOT NULL,
    "type_name" "ContentTypes" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("type_id")
);

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
