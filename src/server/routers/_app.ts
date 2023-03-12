import { z } from "zod";
import { prisma } from "../../pages/api/prisma";
import { procedure, router } from "../trpc";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        msg: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        text: `hello ${input.msg}`,
      };
    }),
  getBookings: procedure.query(async () => {
    const bookings = await prisma.bookings.findMany({
      orderBy: {
        start_date: "asc",
      },
    });
    console.log("getBookings", bookings.length);
    return bookings;
  }),
  approveBooking: procedure
    .input(
      z.object({
        bookingId: z.number(),
        user: z.string().optional().nullable(),
        approved: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.user) {
        const [booking, allBookings] = await Promise.all([
          prisma.bookings.update({
            where: {
              id: input.bookingId,
            },
            data: {
              approved: !input.approved,
            },
          }),
          prisma.bookings.findMany({
            orderBy: {
              start_date: "asc",
            },
          }),
        ]);

        return { booking, allBookings };
      }
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
