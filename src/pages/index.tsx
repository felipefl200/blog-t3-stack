import { IoReorderThreeOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";
export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col">
      <header className="flex h-20 w-full items-center justify-around bg-gray-50 shadow-sm">
        <div>
          <IoReorderThreeOutline className="text-2xl text-gray-600" />
        </div>
        <div className="text-xl font-thin">Ultimate Blog</div>
        <div className="flex items-center space-x-4">
          <div>
            <BsBell className="text-2xl text-gray-600" />
          </div>
          <div>
            <div className="h-5 w-5 rounded-full bg-gray-600"></div>
          </div>
          <div>
            <button className="flex items-center space-x-3 rounded-md border border-gray-200 px-4 py-1.5 transition-all duration-300 hover:border-gray-400">
              <div>Write</div>
              <div>
                <FiEdit className="" />
              </div>
            </button>
          </div>
        </div>
      </header>
      <section className="grid h-full w-full grid-cols-12 place-items-center">
        <main className="col-span-8 h-full w-full border-r border-gray-200">
          <div className="flex w-full flex-col space-y-4 px-24 py-10">
            <div className="flex w-full items-center space-x-4">
              <label
                htmlFor="search"
                className="relative w-full rounded-full border border-gray-300 "
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
              <div className="flex w-full items-center justify-end space-x-4">
                <div>My Topics</div>
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
          <div></div>
        </main>
        <aside className="col-span-4">here sidebar</aside>
      </section>
    </div>
  );
}
