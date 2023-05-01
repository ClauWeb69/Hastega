-- AlterTable
ALTER TABLE `userbook` MODIFY `id_user` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Userbook` ADD CONSTRAINT `Userbook_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Userbook` ADD CONSTRAINT `Userbook_id_book_fkey` FOREIGN KEY (`id_book`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
