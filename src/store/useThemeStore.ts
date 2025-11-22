import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { StorageKeys } from "../config/StorageKeys";

const darkColorSchemes = ["dark"] as const;
const lightColorSchemes = ["light"] as const;
const colorSchemes = [...lightColorSchemes, ...darkColorSchemes] as const;

type ColorScheme = (typeof colorSchemes)[number];
type Theme = ColorScheme | "system";

interface ThemeState {
    theme: Theme;

    // Derived state (the actual theme applied, useful for NativeWind)
    currentColorScheme: ColorScheme;

    isDark: () => boolean;
    setTheme: (newTheme: Theme) => void;
    initializeTheme: () => Promise<void>;
}

// Helper function to calculate the active scheme based on preference
const getActiveScheme = (preference: Theme): ColorScheme => {
    if (preference === "system") {
        return Appearance.getColorScheme() || "light";
    }
    return preference;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
    theme: "system",
    currentColorScheme: getActiveScheme("system"),

    isDark: (): boolean => {
        const ccs = get().currentColorScheme as string;
        for (let index = 0; index < darkColorSchemes.length; index++) {
            const el = darkColorSchemes[index];
            if (el === ccs) {
                return true;
            }
        }
        return false;
    },

    setTheme: (newTheme) => {
        AsyncStorage.setItem(StorageKeys.THEME_KEY, newTheme);
        const activeScheme = getActiveScheme(newTheme);

        set({
            theme: newTheme,
            currentColorScheme: activeScheme,
        });

        console.log(`Theme set to: ${newTheme}. Active scheme: ${activeScheme}`);
    },

    initializeTheme: async () => {
        try {
            // if no stored theme, use system theme by default
            const storedTheme = await AsyncStorage.getItem(StorageKeys.THEME_KEY);
            const currTheme = (storedTheme || "system") as Theme;

            set({
                theme: currTheme,
                currentColorScheme: getActiveScheme(currTheme),
            });

            // Set up listener for OS theme change, when user chooses 'system' theme, If the user
            // specifically chooses for a light or dark theme inside the app, global OS changed
            // should not matter. A question might be why we're adding listener and checking if the
            // theme is system inside the listener, when we could have checked theme preference
            // first and skipped the listener attachment. Answer to that is if the user changes the
            // theme to system while using the application, the listener will catch it and act, but
            // if there was no listener initially, changing the theme midway in application wouldn't
            // trigger computing the theme based on user's OS preference.
            Appearance.addChangeListener(({ colorScheme }) => {
                const userPreferredTheme = get().theme;
                // if the current preferred theme for user is not `system` then whatever appearance
                // this listener detects does not matter
                if (userPreferredTheme === "system") {
                    // Update the active scheme if the user prefers 'system' and the device changes
                    set({ currentColorScheme: colorScheme || "light" });
                    console.log(`System color scheme changed. Active scheme updated to: ${colorScheme}`);
                } else {
                    console.log(`System color scheme changed: ${colorScheme}. User prefers ${userPreferredTheme}`);
                }
            });
            console.log("Theme initialization complete.");
        } catch (e) {
            console.error("Error initializing theme from AsyncStorage:", e);
        }
    },
}));
