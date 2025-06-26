-- CreateEnum
CREATE TYPE "MenuType" AS ENUM ('menu', 'dessert', 'boissons');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('customer', 'admin');

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "price" DECIMAL(65,30)[] DEFAULT ARRAY[]::DECIMAL(65,30)[],
    "type" "MenuType" NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tbluser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "contact" TEXT,
    "accounts" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "password" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'local',
    "country" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "user_role" "UserRole" NOT NULL DEFAULT 'customer',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tbluser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tbluser_email_key" ON "Tbluser"("email");
