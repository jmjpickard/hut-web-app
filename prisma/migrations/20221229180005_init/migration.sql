-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "approved" BOOLEAN NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);
