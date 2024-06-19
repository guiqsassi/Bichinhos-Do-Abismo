/*
  Warnings:

  - A unique constraint covering the columns `[squadId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `squadId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` ADD COLUMN `squadId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Project_squadId_key` ON `Project`(`squadId`);

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_squadId_fkey` FOREIGN KEY (`squadId`) REFERENCES `Squad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
