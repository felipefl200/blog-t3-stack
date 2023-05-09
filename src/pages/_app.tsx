import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { GlobalContextProvider } from "~/context/GlobalContext";
import { Toaster } from "react-hot-toast";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <Toaster />
        <GlobalContextProvider>
          <Component {...pageProps} />
        </GlobalContextProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
