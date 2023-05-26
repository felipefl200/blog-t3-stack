import Image from "next/image";
import { api } from "~/utils/api";
import { timeFromNow } from "~/utils/dayjs";

export function SideSection() {
  const bookmarks = api.post.getBookmarkList.useQuery();
  return (
    <aside className="hidden p-10 md:col-span-4 md:block">
      <div>
        <h3 className="pb-8 font-semibold">Pessoas que talvez você conheça</h3>
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-5">
              <p className="aspect-square h-12 w-12 rounded-full bg-gray-200"></p>
              <div>
                <span className="font-semibold">Paulo Silva</span>
                <span className="line-clamp-2 text-xs leading-4 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem voluptatibus hic ad velit.
                </span>
              </div>
              <div>
                <button className="flex items-center space-x-3 rounded-md border border-gray-400/50 px-4 py-1.5 transition-all duration-300 hover:border-gray-400">
                  <span>Seguir</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h3 className="mb-8 font-semibold">Sua lista de leitura</h3>
        <div className="flex flex-col space-y-4">
          {bookmarks.data &&
            bookmarks.data.map((bookmark) => (
              <div
                key={bookmark.post.id}
                className="flex items-center space-x-4"
              >
                <div className="aspect-square w-2/5 rounded-xl bg-gray-200"></div>
                <div className="flex w-3/5 flex-col space-y-2">
                  <div className="text-xl font-semibold leading-6">
                    {bookmark.post.title}
                  </div>
                  <div className="line-clamp-3 text-sm leading-5">
                    {bookmark.post.description}
                  </div>
                  <div className="flex w-full items-center space-x-1 text-sm">
                    <Image
                      width={40}
                      height={40}
                      src={
                        bookmark.post.author.image ||
                        `https://ui-avatars.com/api/?name=${bookmark.post.author.name}`
                      }
                      alt={bookmark.post.author.name || "avatar"}
                      className="h-10 w-10 rounded-full bg-gray-200"
                    />
                    <div>{bookmark.post.author.name} &#x2022;</div>
                    <div className="whitespace-nowrap overflow-clip">{timeFromNow(bookmark.post.createdAt)}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </aside>
  );
}
