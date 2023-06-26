import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { api } from "~/utils/api";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HiXMark } from "react-icons/hi2";
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
  postId,
  showCommentSidebar,
  setShowCommentSidebar,
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
    <Sheet open={showCommentSidebar} onOpenChange={setShowCommentSidebar}>
      {/* <SheetTrigger>Open</SheetTrigger> */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Respostas{" "}
            {getComments.isSuccess && getComments.data.length > 0 ? (
              <span>({getComments.data.length})</span>
            ) : null}
          </SheetTitle>
          <SheetDescription></SheetDescription>
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
              className="flex items-center space-x-3 rounded-md border border-gray-200 px-4 py-1.5 transition-all duration-300 hover:border-gray-400 disabled:animate-none disabled:border-gray-100 disabled:text-gray-300"
            >
              <div className="transition-colors duration-300 delay-300 group-hover:text-green-700">
                Publicar
              </div>
            </button>
          </form>
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
                      <p className="text-sm">Founder, teacher and developer</p>
                    </div>
                  </div>
                  <div className="p-2 text-sm text-gray-600">
                    {comment.text}
                  </div>
                </div>
              ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
