import { z } from "zod";
import type { WriteFormSchema } from "~/components/WriteFormModal";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(WriteFormSchema)
    .mutation(async ({ ctx: { prisma, session }, input }) => {}),
});
