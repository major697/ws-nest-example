/*
  Warnings:

  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "context_id" DROP NOT NULL,
ALTER COLUMN "socket_id" DROP NOT NULL;
