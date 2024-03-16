/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inventoryId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `inventoryId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarUrl",
ADD COLUMN     "inventoryId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_inventoryId_key" ON "User"("inventoryId");
