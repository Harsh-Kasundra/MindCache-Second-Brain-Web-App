-- CreateEnum
CREATE TYPE "ContentTypes" AS ENUM ('Instagram', 'Twitter', 'Youtube', 'Medium', 'Image', 'Text');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Content" (
    "content_id" TEXT NOT NULL,
    "content_title" TEXT NOT NULL,
    "content_description" TEXT NOT NULL,
    "content_link" TEXT,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "type_id" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("content_id")
);

-- CreateTable
CREATE TABLE "Type" (
    "type_id" TEXT NOT NULL,
    "type_name" "ContentTypes" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "tag_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "Link" (
    "link_id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("link_id")
);

-- CreateTable
CREATE TABLE "_ContentTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ContentTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Link_hash_key" ON "Link"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "Link_user_id_key" ON "Link"("user_id");

-- CreateIndex
CREATE INDEX "_ContentTags_B_index" ON "_ContentTags"("B");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentTags" ADD CONSTRAINT "_ContentTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("content_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentTags" ADD CONSTRAINT "_ContentTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;
