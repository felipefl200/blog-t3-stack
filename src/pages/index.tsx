import { IoReorderThreeOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";
import { Tailwindcss } from "~/components/tailwindcss";
export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col">
      <header className="bg-gray-50 shadow-sm">
        <div className="mx-auto flex h-16 w-full max-w-[96rem] items-center justify-between px-6">
          <div>
            <IoReorderThreeOutline className="text-2xl text-gray-600" />
          </div>
          <div className="text-xl font-thin">Ultimate Blog</div>
          <div className="flex items-center space-x-4">
            <div>
              <BsBell className="text-2xl text-gray-600" />
            </div>
            <div>
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            </div>
            <div>
              <button className="flex items-center space-x-3 rounded-md border border-gray-200 px-4 py-1.5 transition-all duration-300 hover:border-gray-400">
                <div>Escrever</div>
                <div>
                  <FiEdit className="" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className="mx-auto grid h-full w-full max-w-[96rem] grid-cols-12">
        <main className="col-span-12 h-full w-full border-r border-gray-200 px-24 md:col-span-8">
          <div className="flex w-full flex-col space-y-4 py-10">
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
          {/* Articles */}
          <div className="flex w-full flex-col justify-center space-y-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex h-auto flex-col space-y-8 border-b border-gray-200 last:border-none"
              >
                <div className="grid w-full grid-rows-2 gap-4 md:grid-cols-12 md:grid-rows-none">
                  <div className="col-span-8">
                    <p className="text-3xl font-bold leading-none text-gray-800">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Sapiente, aperiam.
                    </p>
                    <p className="pt-4 text-sm text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Aliquid, sed possimus mollitia eius praesentium
                      exercitationem consequuntur natus ipsum blanditiis eos
                      fuga odio nam atque veritatis cum voluptatum
                      reprehenderit. A nisi eum magnam, sunt alias enim eaque
                      voluptates vero cum. Rerum eaque provident officiis, quae
                      quos, dicta ratione illo numquam obcaecati, ipsam dolor
                      maiores quod porro a quisquam placeat eligendi quibusdam!
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
              </div>
            ))}
          </div>
        </main>
        {/* SIDEBAR */}
        <aside className="hidden p-10 md:col-span-4 md:block">
          <div>
            <h3 className="pb-8 font-semibold">
              Pessoas que talvez você conheça
            </h3>
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
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="aspect-square w-2/5 rounded-xl bg-gray-200"></div>
                  <div className="flex w-3/5 flex-col space-y-2">
                    <div className="text-xl font-semibold leading-6">
                      TITLE dolor sit amet consectetur.
                    </div>
                    <div className="line-clamp-3 text-sm leading-5">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolor ipsa harum incidunt reiciendis?
                    </div>
                    <div className="flex w-full items-center space-x-1 text-sm">
                      <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                      <div>Paulo Silva &#x2022;</div>
                      <div>22 Dez. 2023</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
      <Tailwindcss />
    </div>
  );
}
