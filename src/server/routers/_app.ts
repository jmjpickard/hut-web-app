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
    const bookings = await prisma.bookings.findMany({});
    console.log("getBookings", bookings.length);
    return bookings;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
