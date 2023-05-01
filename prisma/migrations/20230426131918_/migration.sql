-- CreateTable
CREATE TABLE `User_Books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_book` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `Completed` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
