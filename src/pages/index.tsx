import { IoReorderThreeOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
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
            <button className="flex items-center space-x-3 rounded-md border transition-all border-gray-200 px-4 py-2 hover:border-gray-400 duration-300">
              <div>Write</div>
              <div>
                <FiEdit className="" />
              </div>
            </button>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-12">{/* main */}</div>
    </div>
  );
}
