"use client";

import Container from "@/components/UiComponents/Layouts/Container";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

type ContainerContextValue = {
  pageTitle: any;
  setPageTitle: (t: any) => void;
  user: any;
  setUser: (u: any) => void;
  fetchUser: () => void;
};

const ContainerContext = createContext<ContainerContextValue | undefined>(undefined);

export const ContainerProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState<any>();
  const [user, setUser] = useState<any>(null);

  // Landing‑page friendly: no backend call; keep function so other components
  // that call `fetchUser()` won't break.
  const fetchUser = () => {
    setUser(null);
  };

  useEffect(() => {
    if (router.pathname === "/demo" || router.pathname.startsWith("/demo/")) {
      setUser(null);
    } else {
      fetchUser();
    }
    // Intentionally single-run on mount (same as your previous effect)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContainerContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        user,
        setUser,
        fetchUser,
      }}
    >
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
