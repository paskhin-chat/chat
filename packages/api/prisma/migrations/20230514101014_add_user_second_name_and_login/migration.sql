/*
  Warnings:

  - Added the required column `login` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "secondName" TEXT;
