import { createContext, useContext, useMemo } from "react";
import { MMKV, useMMKVObject } from "react-native-mmkv";
import * as React from "react";

const appDataInstance = new MMKV({ id: "appData" });

interface SettingsContextType<T> {
    settings: T;
    updateSettings: (appSettings: Partial<T>) => void;
}

const SettingsContext = createContext<SettingsContextType<unknown>>({
    settings: {},
    updateSettings: () => {},
});

interface AppSettingsContextProps {
    children: React.ReactNode;
}

export function AppSettingsContext<T>({ children }: AppSettingsContextProps) {
    const [state, setState] = useMMKVObject<T>("AppSettings", appDataInstance);

    const value = useMemo(() => {
        const current = state ?? {};
        return {
            settings: current,
            updateSettings: (update) => {
                setState({
                    ...current,
                    ...update,
                } as T);
            },
        } as SettingsContextType<T>;
    }, [state, setState]);

    return <SettingsContext.Provider value={value} children={children} />;
}

export function useAppSettings<T>() {
    return useContext(SettingsContext) as SettingsContextType<T>;
}
