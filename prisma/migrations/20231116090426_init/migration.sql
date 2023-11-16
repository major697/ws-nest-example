/*
  Warnings:

  - Made the column `context_id` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `socket_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "context_id" SET NOT NULL,
ALTER COLUMN "socket_id" SET NOT NULL;
