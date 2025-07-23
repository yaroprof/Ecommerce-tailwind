import { useState, useEffect } from 'react';

export const usePersistedState = (key, initialValue) => {
    const [state, setState] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue;
        } catch (error) {
            console.error(`Error loading ${key} from localStorage`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error saving ${key} to localStorage`, error);
        }
    }, [key, state]);

    return [state, setState];
};
