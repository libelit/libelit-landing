"use client";

import Container from "@/components/UiComponents/Layouts/Container";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Keep the API surface as `any` for now to avoid typing churn
const ContainerContext = createContext<any>(undefined);

export const ContainerProvider = ({ children }: any) => {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState<any>();
  const [accounts, setAccounts] = useState<any>([]);
  const [user, setUser] = useState(null);
  const [transaction, setTransaction] = useState([]);

  // Landing‑page friendly: no backend call; keep function so other components
  // that call `fetchUser()` won't break.
  const fetchUser = () => {
    setUser(null);
  };

  useEffect(() => {
    // Preserve original route behavior without calling a backend
    if (router.pathname === "/demo" || router.pathname.startsWith("/demo/")) {
      setUser(null);
    } else {
      fetchUser();
    }
  }, []);

  return (
    <ContainerContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        accounts,
        setAccounts,
        user,
        fetchUser,
        setUser,
        transaction,
        setTransaction,
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
