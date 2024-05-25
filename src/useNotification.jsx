import React, { useState, useEffect } from 'react';

const useNotification = (message, kind="regular") => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        
      }, 5000);
    }
  }, [message]);

  const NotificationComponent = isVisible ? (
    <div className={`fixed bottom-0 left-0 right-0 text-white text-center p-4 ${kind=="regular" ? "bg-cl4" : kind=="error" ? "bg-cl4" : "bg-cl3" }`}>
      {message}
    </div>
  ) : null;

  return NotificationComponent;
};

export default useNotification;
