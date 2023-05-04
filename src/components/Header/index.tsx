import { Menu, Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { BsBell } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { ImExit } from "react-icons/im";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useContext, Fragment } from "react";
import { GlobalContext } from "~/context/GlobalContext";
import Link from "next/link";
export function Header() {
  const { data: sessionData, status } = useSession();
  const { setIsWriteModalOpen } = useContext(GlobalContext);
  return (
    <header className="bg-gray-50 shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-[96rem] items-center justify-between px-12">
        <IoReorderThreeOutline className="text-2xl text-gray-600" />
        <Link href={"/"}>
          <div className="cursor-pointer select-none text-xl font-thin">
            Ultimate Blog
          </div>
        </Link>
        {status === "authenticated" ? (
          <div className="flex items-center space-x-4">
            <div>
              <BsBell className="text-2xl text-gray-600" />
            </div>
            <div>
              {sessionData.user.image ? (
                <>
                  <Menu
                    as="div"
                    className="h-10 w-10 rounded-full p-0.5 outline-none ring-1 ring-gray-300 transition-all hover:ring-gray-500"
                  >
                    <Menu.Button>
                      <img
                        src={sessionData.user.image}
                        alt="Avatar"
                        className="rounded-full"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items>
                        <div
                          onClick={() => signOut()}
                          className="group flex w-20 cursor-pointer items-center gap-2 rounded-md bg-white px-4 py-2 shadow"
                        >
                          <span>Sair</span>
                          <ImExit className="text-gray-500 transition-all duration-300 group-hover:text-red-500" />
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              )}
            </div>
            <div>
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="flex items-center space-x-3 rounded-md border border-gray-200 px-4 py-1.5 transition-all duration-300 hover:border-gray-400"
              >
                <div>Escrever</div>
                <div>
                  <FiEdit className="" />
                </div>
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="flex items-center space-x-3 rounded-md border border-gray-400/50 px-4 py-1.5 transition-all duration-300 hover:border-gray-400"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
