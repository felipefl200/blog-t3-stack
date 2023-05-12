import slugify from "slugify";
import { z } from "zod";

import { WriteFormSchema } from "~/components/WriteFormModal";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(WriteFormSchema)
    .mutation(
      async ({
        ctx: { prisma, session },
        input: { title, text, description },
      }) => {
        await prisma.post.create({
          data: {
            title,
            description,
            text,
            slug: slugify(title, { lower: true }),
            authorId: session.user.id,
          },
        });
      }
    ),

  getPosts: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    return posts;
  }),

  getPost: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx: { prisma, session }, input: { slug } }) => {
      const post = await prisma.post.findUnique({
        where: {
          slug,
        },
        select: {
          id: true,
          description: true,
          title: true,
          text: true,
          likes: true,
        },
      });
      return post;
    }),

  likePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
      await prisma.like.create({
        data: {
          postId,
          userId: session.user.id,
        },
      });
    }),

  disLikePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId,
          },
        },
      });
    }),
});
