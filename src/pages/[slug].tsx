import { useRouter } from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { MainLayout } from "~/layouts/MainLayout";
import { api } from "~/utils/api";

export default function PostPage({}) {
  const router = useRouter();
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
  return (
    <MainLayout>
      {getPost.isLoading && (
        <div className="flex h-full w-full items-center justify-center space-x-4">
          <div>
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        </div>
      )}
      {getPost.isSuccess && (
        <div className="fixed bottom-10 flex w-full items-center justify-center">
          <div className="flex items-center space-x-4 rounded-full border border-gray-400 bg-white px-6 py-3 hover:border-gray-600 hover:shadow">
            <div className="flex items-center border-r border-gray-200 pr-2 space-x-1">
              <FcLike className="text-2xl" />
              <span>4</span>
            </div>
            <div className="flex items-center space-x-1">
              <BsChat className="text-xl" />
              <span>4</span>
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
