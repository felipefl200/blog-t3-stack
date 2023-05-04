import { GlobalContext } from "~/context/GlobalContext";
import { useContext } from "react";
import { Modal } from "../Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";

type WriteFormType = {
  title: string;
  description: string;
  text: string;
};

export const WriteFormSchema = z.object({
  title: z.string().min(5, "Título obrigatária"),
  description: z.string().min(3, "Descrição obrigatário"),
  text: z.string().min(1, "Texto obrigatário"),
});

export function WriteFormModal() {
  const { isWriteModalOpen, setIsWriteModalOpen } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm<WriteFormType>({
    resolver: zodResolver(WriteFormSchema),
  });

  const createPost = api.post.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post criado com sucesso!");
      setIsWriteModalOpen(false);
      reset();
      postRoute.getPosts.invalidate();
    },
  });

  const postRoute = api.useContext().post;

  function handleWritePost(data: WriteFormType) {
    createPost.mutate(data);
  }

  return (
    <Modal isOpen={isWriteModalOpen} onClose={() => setIsWriteModalOpen(false)}>
      <form
        onSubmit={handleSubmit(handleWritePost)}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <div className="w-full">
          <input
            {...register("title")}
            type="text"
            name="title"
            className="h-full w-full rounded-md border border-gray-300 p-4 outline-none focus:border-gray-600 active:border-gray-600"
            placeholder="Título do post"
          />
          {errors.title && (
            <p className="text-xs italic text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <input
            {...register("description")}
            type="text"
            name="description"
            className="h-full w-full rounded-md border border-gray-300 p-4 outline-none focus:border-gray-600 active:border-gray-600"
            placeholder="Descrição curta do post"
          />
          {errors.description && (
            <p className="text-xs italic text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <textarea
            {...register("text")}
            cols={10}
            rows={10}
            name="text"
            className="h-full w-full rounded-md border border-gray-300 p-4 outline-none focus:border-gray-600 active:border-gray-600"
            placeholder="Texto do post"
          />
          {errors.text && (
            <p className="text-xs italic text-red-500">{errors.text.message}</p>
          )}
        </div>
        <div className="group flex w-full justify-end">
          <button
            type="submit"
            className="flex items-center space-x-3 rounded-md border border-gray-200 px-4 py-1.5 transition-all duration-300 hover:border-gray-400"
          >
            <div className="transition-colors delay-300 duration-300 group-hover:text-green-700">
              Publicar
            </div>
          </button>
        </div>
      </form>
    </Modal>
  );
}
