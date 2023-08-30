-- AlterTable
ALTER TABLE "User" ADD COLUMN     "id" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "Password" (
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Password_email_key" ON "Password"("email");
