// context/AlertContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Alert {
  id: number;
  message: string;
  type: string;
}

interface AlertContextProps {
  alerts: Alert[];
  alert: (message: string, type: string) => void;
  removeAlert: (id: number) => void;
}

interface AlertProviderProps {
  children: ReactNode;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const alert = (message: string, type: string) => {
    const newAlert: Alert = {
      id: Date.now(), // Using a timestamp as the ID
      message,
      type,
    };

    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  const removeAlert = (id: number) => {
    const updatedAlerts = alerts.filter((alert) => alert.id !== id);
    setAlerts(updatedAlerts);
  };

  return (
    <AlertContext.Provider value={{ alerts, alert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
