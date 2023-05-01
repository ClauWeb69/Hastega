/*
  Warnings:

  - You are about to drop the `userbooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `userbooks`;

-- CreateTable
CREATE TABLE `Userbook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_book` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `Completed` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
