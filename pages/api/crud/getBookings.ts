// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Bookings } from "@prisma/client";
import type { NextApiResponse } from "next";
import prisma from "../prisma";

export default async function handler(
  _: any,
  res: NextApiResponse<Bookings[]>
) {
  const bookings = await prisma.bookings.findMany({});
  console.log("getBookings", bookings.length);
  res.status(200).json(bookings);
}
