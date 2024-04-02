//sample input 
// const handleSubmitApiCall = useMutation({})
// storeName='form'
// mutation={handleSubmitApiCall}

import { useEffect } from "react";


type IUseOfflineMutation = {
    storeName: string;
    mutation: any;
    localState: any;
    setLocalState: any;
    isOnline: boolean;
}

export const useOfflineMutation = ({ storeName, mutation, localState, setLocalState, isOnline }: IUseOfflineMutation): any => {
    const localCache = localStorage.getItem(storeName);

    useEffect(() => {
        if (localCache !== null && !mutation?.isPending) {
            setLocalState(JSON.parse(localCache));

            // check localState object don't have any empty value
            if (Object.values(localState).every((value: any) => value !== "")) {
                mutation.mutate({});
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOnline]);
}