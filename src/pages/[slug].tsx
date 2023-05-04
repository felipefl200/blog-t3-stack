import { useRouter } from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
      <div className="flex h-full w-full flex-col items-center justify-center p-10">
        <div className="flex w-full max-w-screen-md flex-col space-y-6">
          <div className="realtive h-[60vh] w-full rounded-xl bg-gray-300 shadow-lg">
            Image
            <div className="absoltute flex items-center justify-center h-full w-full">
              <div className="bg-black bg-opacity-50 rounded-xl p-4 text-2xl font-bold text-gray-100">
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
