import React from "react";
import { useAlert } from "@/contexts/AlertContext";
import Alert from "./Alert";

const GlobalAlerts: React.FC = () => {
  const { alerts, removeAlert } = useAlert();
  return (
    <div className="global-alerts !z-[10]">
      <div className="gap-wrapper">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            message={alert.message}
            type={alert.type}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GlobalAlerts;
