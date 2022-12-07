import React, { useState, useEffect } from "react";

/**
 * local storage custom hook adapted from slides
 */
const useLocalStorage = (key, defaultVal = null) => {
    //set state either from local storage or defaultVal
    const [state, setState] = useState(() => {
        //if for some reason JSON.parse errors, just use defaultVal
        try {
            return JSON.parse(localStorage.getItem(key)) || defaultVal;
        } catch (e) {
            return defaultVal;
        }
    });
    //any time state is changed, set it in local storage
    useEffect(() => {
        //clean up if null
        if (state === null) {
            localStorage.removeItem(key);
        }
        else {
            localStorage.setItem(key, state);
        }
    }, [key, state]);

    return [state, setState];
}

export default useLocalStorage;