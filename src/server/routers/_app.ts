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
  createBooking: procedure
    .input(
      z.object({
        owner: z.string(),
        title: z.string(),
        description: z.string(),
        start_date: z.string(),
        end_date: z.string(),
        approved: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.$transaction(async (tx) => {
        const booking = await tx.bookings.create({
          data: {
            owner: input.owner,
            title: input.title,
            description: input.description,
            start_date: input.start_date,
            end_date: input.end_date,
            approved: input.approved,
          },
        });
        if (booking) {
          const allBookings = await tx.bookings.findMany({});
          return allBookings;
        }
      });
    }),
  deleteBooking: procedure
    .input(
      z.object({
        bookingId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.$transaction(async (tx) => {
        const booking = await tx.bookings.delete({
          where: {
            id: input.bookingId,
          },
        });
        if (booking) {
          const allBookings = await tx.bookings.findMany({});
          return allBookings;
        }
      });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
