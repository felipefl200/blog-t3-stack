import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";
import { api } from "~/utils/api";
import { Post } from "../Post";

import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

export function MainSection() {
  const getPosts = api.post.getPosts.useQuery();

  return (
    <main className="col-span-12 h-full w-full border-r border-gray-200 px-24 md:col-span-8">
      <div className="flex w-full flex-col space-y-4 py-10">
        <div className="flex w-full flex-col items-center space-x-4 lg:flex-row">
          <label
            htmlFor="search"
            className="relative w-full min-w-max rounded-full border border-gray-300 "
          >
            <div className="absolute left-2 flex h-full items-center">
              <CiSearch />
            </div>
            <input
              type="text"
              placeholder="Procura..."
              className="w-full rounded-full px-4 py-1.5 pl-7 pr-6 outline-none"
            />
          </label>
          <div className="flex w-full items-center justify-end space-x-4 whitespace-nowrap pt-4 lg:pt-0">
            <div className="mt-4 flex items-center space-x-2">
              <div className="-mt-4">My Topics</div>
              <ScrollArea className="max-w-xs pb-4">
                <ScrollBar
                  orientation="horizontal"
                  className="flex touch-none select-none flex-col rounded bg-gray-100 p-0.5 transition-colors duration-150 ease-out hover:bg-gray-200"
                ></ScrollBar>
                <div className="flex items-center gap-2 overflow-x-auto">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="cursor-pointer whitespace-nowrap rounded-3xl bg-gray-200/50 px-4 py-1.5"
                    >
                      tag {i + 1}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
        <div className="item-center flex w-full justify-between border-b border-gray-300 pb-8">
          <div>Articles</div>
          <div>
            <button className="flex items-center space-x-2 rounded-3xl border border-gray-800 px-4 py-1.5 font-semibold">
              <div>Following</div>
              <div>
                <HiChevronDown className="text-xl" />
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* Articles */}
      <div className="flex w-full flex-col justify-center space-y-8">
        {getPosts.isLoading && (
          <div className="flex h-full w-full items-center justify-center space-x-4">
            <div>
              <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
          </div>
        )}
        {getPosts.isSuccess &&
          getPosts.data.map((post, i) => <Post {...post} key={i} />)}
      </div>
    </main>
  );
}
