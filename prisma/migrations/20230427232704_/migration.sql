/*
  Warnings:

  - A unique constraint covering the columns `[id_user,id_book]` on the table `Userbook` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Userbook_id_user_id_book_key` ON `Userbook`(`id_user`, `id_book`);
