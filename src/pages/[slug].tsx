import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { MainLayout } from "~/layouts/MainLayout";
import { api } from "~/utils/api";
import { CommentSidebar } from "~/components/CommentSidebar";

export default function PostPage({}) {
  const post = false;
  const router = useRouter();
  const session = useSession();
  const getPost = api.post.getPost.useQuery(
    {
      slug: router.query.slug as string,
    },
    {
      enabled: !!router.query.slug,
      //   or
      // enabled: Boolean(router.query.slug)
    }
  );

  const utils = api.useContext().post;

  const likePost = api.post.likePost.useMutation({
    onSuccess: () => {
      utils.getPost.invalidate({ slug: router.query.slug as string });
    },
  });

  const disLikePost = api.post.disLikePost.useMutation({
    onSuccess: () => {
      utils.getPost.invalidate({ slug: router.query.slug as string });
    },
  });

  const likeByMe = () => {
    if (
      getPost.data?.likes.find((like) => like.userId === session.data?.user.id)
    )
      return true;
    return false;
  };

  const countLikes = getPost.data?.likes.length || 0;
  const countComments = getPost.data?.comments.length || 0;

  const [showCommentSidebar, setShowCommentSiidebar] = useState(false);

  return (
    <MainLayout>
      {getPost.data?.id && (
        <CommentSidebar
          showCommentSidebar={showCommentSidebar}
          setShowCommentSidebar={setShowCommentSiidebar}
          postId={getPost.data?.id}
        />
      )}

      {getPost.isLoading && (
        <div className="flex h-full w-full items-center justify-center space-x-4">
          <div>
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        </div>
      )}
      {getPost.isSuccess && (
        <div className="fixed bottom-10 flex w-full items-center justify-center">
          <div className="group flex items-center space-x-4 rounded-full border border-gray-400 bg-white px-6 py-3 duration-150 hover:border-gray-600 hover:shadow">
            <div className="flex items-center space-x-1 border-r border-gray-200 pr-2 duration-150 group-hover:border-gray-400">
              {likeByMe() ? (
                <>
                  <FcLike
                    onClick={() =>
                      getPost.data?.id &&
                      disLikePost.mutate({ postId: getPost.data?.id })
                    }
                    className="cursor-pointer text-2xl"
                  />
                  {countLikes > 0 ? <span>{countLikes}</span> : null}
                </>
              ) : (
                <>
                  <FcLikePlaceholder
                    onClick={() =>
                      getPost.data?.id &&
                      likePost.mutate({ postId: getPost.data?.id })
                    }
                    className="cursor-pointer text-2xl"
                  />
                  {countLikes > 0 ? <span>{countLikes}</span> : null}
                </>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <BsChat
                onClick={() => setShowCommentSiidebar(true)}
                className="cursor-pointer text-xl"
              />
              {countComments > 0 ? <span>{countComments}</span> : null}
            </div>
          </div>
        </div>
      )}
      <div className="flex h-full w-full flex-col items-center justify-center p-10">
        <div className="flex w-full max-w-screen-md flex-col space-y-6">
          <div className="realtive h-[60vh] w-full rounded-xl bg-white shadow-lg">
            Image
            <div className="absoltute flex h-full w-full items-center justify-center">
              <div className="rounded-xl bg-black bg-opacity-50 p-4 text-2xl font-bold text-gray-100">
                {getPost.data?.title}
              </div>
            </div>
          </div>
          <div className="border-l-4 pl-6">{getPost.data?.description}</div>
          <div>{getPost.data?.text}</div>
        </div>
      </div>
    </MainLayout>
  );
}
