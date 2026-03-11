"use client";

import Container from "@/components/UiComponents/Layouts/Container";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

type ContainerContextValue = {
  pageTitle: any;
  setPageTitle: (t: any) => void;
};

const ContainerContext = createContext<ContainerContextValue | undefined>(undefined);

export const ContainerProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState<any>();

  useEffect(() => {
    // This was used for user switching before, but now it's removed.
    // We keep an effect for future enhancements if needed.
  }, [router.pathname]);

  return (
    <ContainerContext.Provider value={{ pageTitle, setPageTitle }}>
      <Container>{children}</Container>
    </ContainerContext.Provider>
  );
};

export const useContainer = () => {
  const context = useContext(ContainerContext);
  if (!context) {
    throw new Error("useContainer must be used within a ContainerProvider");
  }
  return context;
};
