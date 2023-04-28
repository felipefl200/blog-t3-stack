import { useState, createContext } from "react";

type globalContextType = {
  isWriteModalOpen: boolean;
  setIsWriteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = createContext<{
  isWriteModalOpen: boolean;
  setIsWriteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>(null as unknown as globalContextType);

export function GlobalContextProvider({ children }: React.PropsWithChildren) {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  return (
    <GlobalContext.Provider value={{ isWriteModalOpen, setIsWriteModalOpen }}>
      {children}
    </GlobalContext.Provider>
  );
}
