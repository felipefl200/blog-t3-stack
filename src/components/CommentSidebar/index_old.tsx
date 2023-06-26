import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { z } from "zod";
import { api } from "~/utils/api";
import { timeFromNow } from "~/utils/dayjs";

type CommentSidebarProps = {
  showCommentSidebar: boolean;
  setShowCommentSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
};

type CommentFormType = { text: string };

const CommentFormSchema = z.object({
  text: z.string().min(3),
});

export function CommentSidebar({
  showCommentSidebar,
  setShowCommentSidebar,
  postId,
}: CommentSidebarProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CommentFormType>({
    resolver: zodResolver(CommentFormSchema),
  });

  const postRoute = api.useContext().post;

  const submitComment = api.post.createCommentPost.useMutation({
    onSuccess: () => {
      reset();
      toast.success("Comentário enviado com sucesso!");
      postRoute.getCommentsPost.invalidate();
    },
  });

  const getComments = api.post.getCommentsPost.useQuery({
    postId,
  });

  return (
    <Transition.Root show={showCommentSidebar} as={React.Fragment}>
      <Dialog as="div" onClose={() => setShowCommentSidebar(false)}>
        <div className="fixed inset-0 overflow-hidden backdrop-blur-[1px]">
          <Transition.Child
            enter="ease-in-out duration-500"
            enterFrom="opacity-50 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in-out duration-500 translate-x-full"
          >
            <Dialog.Panel className="absolute right-0 h-screen w-full max-w-md overflow-y-auto border border-l-gray-200 bg-white px-8 shadow-lg">
              <div className="w-full-h-full flex flex-col">
                <div className="mb-6 mt-10 flex items-center justify-between space-x-20 text-xl">
                  <h2 className="font-medium">Respostas (4)</h2>
                  <div>
                    <HiXMark
                      onClick={() => setShowCommentSidebar(false)}
                      strokeWidth={"1px"}
                      className="h-6 w-6 cursor-pointer transition-all duration-150 ease-in-out hover:scale-110"
                    />
                  </div>
                </div>
                <div>
                  <form
                    onSubmit={handleSubmit((data) => {
                      submitComment.mutate({ ...data, postId });
                    })}
                    className="flex h-full w-full flex-col items-end space-y-3"
                  >
                    <textarea
                      {...register("text")}
                      name="text"
                      placeholder="Deixe seu comentário aqui"
                      cols={6}
                      rows={3}
                      className="h-full w-full rounded-xl border border-gray-300 p-4 shadow outline-none focus:border-gray-400"
                    />
                    <button
                      disabled={!isValid}
                      type="submit"
                      className="flex items-center space-x-3 rounded-md border border-gray-200 px-4 py-1.5 transition-all duration-300 hover:border-gray-400 disabled:border-gray-100 disabled:text-gray-300 disabled:animate-none"
                    >
                      <div className="transition-colors delay-300 duration-300 group-hover:text-green-700">
                        Publicar
                      </div>
                    </button>
                  </form>
                </div>
                <div>
                  {getComments.isSuccess &&
                    getComments.data.map((comment, index) => (
                      <div
                        className="flex h-full w-full flex-col border-b border-gray-200 py-4 last:border-none"
                        key={index}
                      >
                        <div className="flex w-full items-center space-x-2 py-2">
                          <Image
                            width={40}
                            height={40}
                            src={
                              comment.user.image ||
                              `https://ui-avatars.com/api/?name=${comment.user.name}`
                            }
                            alt="Felipe França"
                            className="h-10 w-10 rounded-full bg-gray-200"
                          />
                          <div>
                            <p className="font-semibold">
                              {comment.user.name}
                              {" - "}
                              <span>{timeFromNow(comment.createdAt)}</span>
                            </p>
                            <p className="text-sm">
                              Founder, teacher and developer
                            </p>
                          </div>
                        </div>
                        <div className="p-2 text-sm text-gray-600">
                          {comment.text}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
