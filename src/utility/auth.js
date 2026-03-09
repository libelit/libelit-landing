import Cookies from "js-cookie";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

import axiosClient from "@/app/axiosClient";
import requests from "@/Api/requests";

export const setToken = (token) => {
  Cookies.set("access-token", token, { expires: 1 });
};

export const getToken = () => {
  return Cookies.get("access-token");
};

export const removeToken = () => {
  Cookies.remove("access-token");
};

export const isAuthenticated = async () => {
  if (!getToken()) {
    return false;
  }
  try {
    const response = await axiosClient.get(requests.auth.validateToken);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    removeToken();

    // const router = useRouter();
    // router.push("/user/login");
  } catch (error) {
    console.error("Error during logout", error);
  }
};

export const getUsernameFromToken = () => {
  const token = getToken();
  if (token) {
    try {
      const decoded = jwt.decode(token);

      return decoded.username;
    } catch (error) {
      console.error("Error decoding JWT Token : ", error);
      return "";
    }
  }

  return "";
};

export const getEmailFromToken = () => {
  const token = getToken();
  if (token) {
    try {
      const decoded = jwt.decode(token);

      return decoded.sub;
    } catch (error) {
      console.error("Error decoding JWT Token : ", error);
      return "";
    }
  }

  return "";
};

export const checkOTPResponse = (response) => {
  //2FA is disabled
  if (response.data.accessToken) {
    return "no-otp-login";
  }

  //2FA is enabled
  if (response.data["confirmation token"]) {
    return "otp-verify";
  }

  if (
    response.data.status == "failed" &&
    response.data.otp.startsWith("please wait")
  ) {
    return "timeout-90";
  }

  if (
    response.data.status == "failed" &&
    response.data.otp.startsWith("your account is locked")
  ) {
    return "timeout-24";
  }
};
