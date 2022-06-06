/*
  Warnings:

  - Added the required column `body` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `body` VARCHAR(1000) NOT NULL;
