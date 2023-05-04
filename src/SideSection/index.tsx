export function SideSection() {
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
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="aspect-square w-2/5 rounded-xl bg-gray-200"></div>
              <div className="flex w-3/5 flex-col space-y-2">
                <div className="text-xl font-semibold leading-6">
                  TITLE dolor sit amet consectetur.
                </div>
                <div className="line-clamp-3 text-sm leading-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                  ipsa harum incidunt reiciendis?
                </div>
                <div className="flex w-full items-center space-x-1 text-sm">
                  <div className="aspect-square h-8 w-8 rounded-full bg-gray-200"></div>
                  <div>Paulo Silva &#x2022;</div>
                  <div>22 Dez. 2023</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
