import Image from "next/image";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";
import { api } from "~/utils/api";
import { timeFromNow } from "~/utils/dayjs";

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
          <div className="flex w-full items-center justify-end space-x-4 pt-4 lg:pt-0">
            <div className="whitespace-nowrap">My Topics</div>
            <div className="flex flex-wrap items-center gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="whitespace-nowrap rounded-3xl bg-gray-200/50 px-4 py-1.5"
                >
                  tag {i}
                </div>
              ))}
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
          getPosts.data.map((post, i) => (
            <Link
              href={`/${post.slug}`}
              key={i}
              className="flex h-auto flex-col space-y-8 border-b border-gray-200 last:border-none"
            >
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
                    {post.author.name} -{" "}
                    <span>{timeFromNow(post.createdAt)}</span>
                  </p>
                  <p className="text-sm">Founder, teacher and developer</p>
                </div>
              </div>
              <div className="grid w-full grid-rows-2 gap-4 md:grid-cols-12 md:grid-rows-none">
                <div className="col-span-8">
                  <p className="text-3xl font-bold leading-none text-gray-800">
                    {post.title}
                  </p>
                  <p className="pt-4 text-sm text-gray-500">
                    {post.description}
                  </p>
                </div>
                <div className="order-first col-span-12 md:col-span-4 lg:order-1">
                  <div className="h-full w-full rounded-xl bg-gray-200"></div>
                </div>
              </div>
              <div>
                <div className="flex w-full items-center justify-start space-x-4 pb-8">
                  <div className="whitespace-nowrap">My Topics</div>
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="whitespace-nowrap rounded-3xl bg-gray-200/50 px-4 py-1.5"
                      >
                        tag {i}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
}
