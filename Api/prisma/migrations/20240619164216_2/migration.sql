/*
  Warnings:

  - A unique constraint covering the columns `[squadLeaderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[squadId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `squadId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `squadLeaderId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `squadId` INTEGER NOT NULL,
    ADD COLUMN `squadLeaderId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_squadLeaderId_key` ON `User`(`squadLeaderId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_squadId_key` ON `User`(`squadId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_squadLeaderId_fkey` FOREIGN KEY (`squadLeaderId`) REFERENCES `Squad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_squadId_fkey` FOREIGN KEY (`squadId`) REFERENCES `Squad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
