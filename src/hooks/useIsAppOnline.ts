import { onlineManager } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export const useIsAppOnline = (): boolean => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // set the query client to use the async storage persister
        const handleConnectionChange = () => {
            const status = navigator.onLine;
            setIsOnline(status);
            onlineManager.setOnline(status);
        };

        // initial check for online status
        window.addEventListener("online", handleConnectionChange);
        // initial check for online status
        window.addEventListener("offline", handleConnectionChange);

        // cleanup
        return () => {
            window.removeEventListener("online", handleConnectionChange);
            window.removeEventListener("offline", handleConnectionChange);
        };
    }, []);

    return isOnline;
}