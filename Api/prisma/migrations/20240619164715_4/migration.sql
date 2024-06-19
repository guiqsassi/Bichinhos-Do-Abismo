-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_squadId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_squadLeaderId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `squadId` INTEGER NULL,
    MODIFY `squadLeaderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_squadLeaderId_fkey` FOREIGN KEY (`squadLeaderId`) REFERENCES `Squad`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_squadId_fkey` FOREIGN KEY (`squadId`) REFERENCES `Squad`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
