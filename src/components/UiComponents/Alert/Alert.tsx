import React, { useEffect, useState } from "react";
import FailedIcon from "public/icons/general/x-close.svg";
import SuccessIcon from "public/icons/general/success.svg";
import InfoIcon from "public/icons/general/info-icon.svg";


interface AlertProps {
    message: string;
    type: string;
    onClose: () => void;
}

const getAlertInfo = (type: string) => {
    switch (type) {
      case 'success':
        return { title: 'Success', icon: <SuccessIcon /> };
      case 'info':
        return { title: 'Info', icon: <InfoIcon /> };
      case 'error':
        return { title: 'Error', icon: <FailedIcon /> };
      case 'warning':
        return { title: 'Warning', icon: <InfoIcon /> };
      default:
        return { title: 'Info', icon: <InfoIcon /> };
    }
  };

const Alert:React.FC<AlertProps> = ({ message, type, onClose }) => {

    const [alertInfo, setAlertInfo] = useState(() => getAlertInfo(type));
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div className={`alert ${type} alert-${type} flex alert-flex`}>
            <div className="item alert-icon">
                <div className={`circle circle-bg-${type} flex-center`}>
                    {alertInfo.icon}
                </div>
            </div>
            <div className="item alert-message">
                <div className="alert-title color-primary-900 text-md text-semiBold">{alertInfo.title}</div>
                {message}
            </div>
            <div className="alert-close">
                <FailedIcon onClick={onClose}/>
            </div>
        </div>
    )
 
}

export default Alert;