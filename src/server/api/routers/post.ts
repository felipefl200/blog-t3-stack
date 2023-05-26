import slugify from "slugify";
import { z } from "zod";

import { WriteFormSchema } from "~/components/WriteFormModal";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

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

  getPosts: publicProcedure.query(async ({ ctx: { prisma, session } }) => {
    const posts = await prisma.post.findMany({
      // include: {
      //   author: {
      //     select: {
      //       name: true,
      //       image: true,
      //     },
      //   },
      // },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        bookmarks: session?.user.id
          ? {
              where: {
                userId: session?.user.id,
              },
            }
          : false,
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
          comments: true,
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

  bookmarkPost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
      await prisma.bookmark.create({
        data: {
          userId: session.user.id,
          postId,
        },
      });
    }),

  unBookmarkPost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
      await prisma.bookmark.delete({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId,
          },
        },
      });
    }),

  createCommentPost: protectedProcedure
    .input(
      z.object({
        text: z.string().min(3),
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { text, postId } }) => {
      await prisma.comment.create({
        data: {
          text,
          user: {
            connect: {
              id: session.user.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });
    }),

  getCommentsPost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { postId } }) => {
      const comments = await prisma.comment.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          postId,
        },
        select: {
          id: true,
          text: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
      return comments;
    }),

  getBookmarkList: protectedProcedure.query(
    async ({ ctx: { prisma, session } }) => {
      const allBookmarks = await prisma.bookmark.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          post: {
            select: {
              id: true,
              title: true,
              description: true,
              author: {
                select: {
                  name: true,
                  image: true,
                },
              },
              createdAt: true,
            },
          },
        },
        take: 4,
        orderBy: {
          createdAt: "desc",
        },
      });
      return allBookmarks;
    }
  ),
});
