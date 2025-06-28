/*
  Warnings:

  - You are about to drop the column `shipping` on the `orders` table. All the data in the column will be lost.
  - Added the required column `delivery` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "shipping",
ADD COLUMN     "delivery" DECIMAL(65,30) NOT NULL;
