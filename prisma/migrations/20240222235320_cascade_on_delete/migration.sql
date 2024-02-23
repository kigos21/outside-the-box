-- DropForeignKey
ALTER TABLE "ConfirmedReservation" DROP CONSTRAINT "ConfirmedReservation_seatReservationId_fkey";

-- DropForeignKey
ALTER TABLE "FacilityReservation" DROP CONSTRAINT "FacilityReservation_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_confirmedReservationId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "OTP" DROP CONSTRAINT "OTP_adminId_fkey";

-- DropForeignKey
ALTER TABLE "OTP" DROP CONSTRAINT "OTP_customerId_fkey";

-- DropForeignKey
ALTER TABLE "SeatReservation" DROP CONSTRAINT "SeatReservation_customerId_fkey";

-- DropForeignKey
ALTER TABLE "SeatReservation" DROP CONSTRAINT "SeatReservation_serviceId_fkey";

-- AlterTable
ALTER TABLE "OTP" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '10 minutes';

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityReservation" ADD CONSTRAINT "FacilityReservation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_confirmedReservationId_fkey" FOREIGN KEY ("confirmedReservationId") REFERENCES "ConfirmedReservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmedReservation" ADD CONSTRAINT "ConfirmedReservation_seatReservationId_fkey" FOREIGN KEY ("seatReservationId") REFERENCES "SeatReservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatReservation" ADD CONSTRAINT "SeatReservation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatReservation" ADD CONSTRAINT "SeatReservation_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
