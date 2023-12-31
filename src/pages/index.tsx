import { Tailwindcss } from "~/components/tailwindcss";
import { MainLayout } from "~/layouts/MainLayout";
import { WriteFormModal } from "~/components/WriteFormModal";
import { MainSection } from "~/components/MainSection";
import { SideSection } from "~/components/SideSection";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <MainLayout>
      <section className="mx-auto grid h-full w-full max-w-[96rem] grid-cols-12">
        {/* MainContent */}
        <MainSection />
        {/* SIDESECTION */}
        <SideSection />
      </section>
      <WriteFormModal />
      <Tailwindcss />
    </MainLayout>
  );
}
