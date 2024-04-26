-- AlterTable
ALTER TABLE "OTP" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '10 minutes';
