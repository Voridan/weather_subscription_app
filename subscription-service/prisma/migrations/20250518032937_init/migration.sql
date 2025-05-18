-- CreateEnum
CREATE TYPE "MailingFrequency" AS ENUM ('HOURLY', 'DAILY');

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "frequency" "MailingFrequency" NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "secret_token" TEXT NOT NULL,
    "last_sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_email_key" ON "Subscription"("email");
