import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { timeFromNow } from "~/utils/dayjs";
import { CiBookmarkCheck, CiBookmarkPlus } from "react-icons/ci";
import { RouterOutputs, api } from "~/utils/api";

type PostProps = RouterOutputs["post"]["getPosts"][number];

export function Post({ ...post }: PostProps) {
  const [isBookMarked, setIsBookMarked] = useState(
    Boolean(post.bookmarks?.length)
  );

  const bookmarkPost = api.post.bookmarkPost.useMutation({
    onSuccess: () => {
      setIsBookMarked((prev) => !prev);
    },
  });

  const unbookmarkPost = api.post.unBookmarkPost.useMutation({
    onSuccess: () => {
      setIsBookMarked((prev) => !prev);
    },
  });

  return (
    <div className="flex h-auto flex-col space-y-8 border-b border-gray-200 last:border-none">
      <div className="w-full-items-center flex space-x-2">
        <Image
          width={40}
          height={40}
          src={
            post.author.image ||
            `https://ui-avatars.com/api/?name=${post.author.name}`
          }
          alt={post.author.name || "avatar"}
          className="h-10 w-10 rounded-full bg-gray-200"
        />{" "}
        <div>
          <p className="font-semibold">
            {post.author.name} - <span>{timeFromNow(post.createdAt)}</span>
          </p>
          <p className="text-sm">Founder, teacher and developer</p>
        </div>
      </div>

      <div className="grid w-full grid-rows-2 gap-4 md:grid-cols-12 md:grid-rows-none">
        <Link href={`/${post.slug}`} className="col-span-8">
          <p className="text-3xl font-bold leading-none text-gray-800">
            {post.title}
          </p>
          <p className="pt-4 text-sm text-gray-500">{post.description}</p>
        </Link>
        <div className="order-first col-span-12 md:col-span-4 lg:order-1">
          <div className="h-full w-full rounded-xl bg-gray-200"></div>
        </div>
      </div>
      <div>
        <div className="flex w-full items-center justify-between space-x-4 pb-8">
          <div className="flex items-center space-x-2">
            <div className="whitespace-nowrap">My Topics</div>
            <div className="flex items-center space-x-2"></div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="whitespace-nowrap rounded-3xl bg-gray-200/50 px-4 py-1.5"
              >
                tag {i}
              </div>
            ))}
          </div>
          <div>
            {isBookMarked ? (
              <CiBookmarkCheck
                onClick={() => {
                  unbookmarkPost.mutate({ postId: post.id });
                }}
                className="cursor-pointer fill-blue-800 text-2xl"
              />
            ) : (
              <CiBookmarkPlus
                onClick={() => {
                  bookmarkPost.mutate({ postId: post.id });
                }}
                className="cursor-pointer text-2xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
