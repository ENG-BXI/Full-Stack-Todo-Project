/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "category_userId_key" ON "category"("userId");
