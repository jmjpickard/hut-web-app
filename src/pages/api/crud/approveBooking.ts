// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Bookings } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { approveProps } from "../../../../http/bookings";
import { prisma } from "../prisma";

export interface approveBookingReq extends NextApiRequest {
  body: approveProps;
}

export default async function handler(
  req: approveBookingReq,
  res: NextApiResponse<Bookings[]>
) {
  const bookingFromId = await prisma.bookings.update({
    where: {
      id: req.body.id,
    },
    data: {
      approved: req.body.approve,
    },
  });
  const bookings = await prisma.bookings.findMany({});
  console.log("approveBookings", bookingFromId, req.body.approve);
  res.status(200).json(bookings);
}
