import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [authDetails, setAuthDetails] = useState<any>();

  return (
    <AuthContext.Provider
      value={{ authDetails: authDetails, setAuthDetails: setAuthDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const auth_context = useContext(AuthContext);
  if (!auth_context) {
    throw new Error("useAlert must be used within an AuthProvider");
  }
  return auth_context;
};
