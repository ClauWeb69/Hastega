/*
  Warnings:

  - You are about to drop the column `numReads` on the `book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `numReads`;

-- AlterTable
ALTER TABLE `userbook` ADD COLUMN `numReads` INTEGER NOT NULL DEFAULT 0;
