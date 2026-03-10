"use client";
import Container from "@/components/UiComponents/Layouts/Container";
import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "@/app/axiosClient";
import requests from "@/Api/requests";
import { useRouter } from "next/router";
import { ethers } from "ethers";

const ContainerContext = createContext<any>(undefined);

export const ContainerProvider = ({ children }: any) => {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState<any>();
  const [accounts, setAccounts] = useState<any>([]);
  const [user, setUser] = useState(null);
  const [transaction, setTransaction] = useState([]);

  const fetchUser = () => {
    axiosClient
      .get(requests.settings.data)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (router.pathname === "/demo" || router.pathname.startsWith("/demo/"))
      setUser(null);
    else fetchUser();
  }, []);

  return (
    <ContainerContext.Provider
      value={{
        pageTitle: pageTitle,
        setPageTitle: setPageTitle,
        accounts: accounts,
        setAccounts: setAccounts,
        user: user,
        fetchUser: fetchUser,
        setUser: setUser,
        transaction: transaction,
        setTransaction: setTransaction,
      }}
    >
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
