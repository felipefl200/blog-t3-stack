import { Header } from "~/components/Header";

export function MainLayout({ children }: React.PropsWithChildren) {

  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      {children}
    </div>
  );
}
