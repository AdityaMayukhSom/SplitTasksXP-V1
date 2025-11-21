import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

type Theme = "light" | "dark" | "system";

interface SettingsState {
    theme: Theme;

    // Derived state (the actual theme applied, useful for NativeWind)
    currentColorScheme: "light" | "dark";

    // Actions
    setTheme: (newTheme: Theme) => void;
    initializeTheme: () => Promise<void>;
}

const THEME_KEY = "app_theme_preference";

// Helper function to calculate the active scheme based on preference
const getActiveScheme = (preference: Theme): "light" | "dark" => {
    if (preference === "system") {
        return Appearance.getColorScheme() || "light";
    }
    return preference;
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
    theme: "system", // Default preference

    // Initial calculation based on current system preference
    currentColorScheme: getActiveScheme("system"),

    // --- Actions ---

    setTheme: (newTheme) => {
        // 1. Persist the new preference
        AsyncStorage.setItem(THEME_KEY, newTheme);

        // 2. Determine the active scheme and update state
        const activeScheme = getActiveScheme(newTheme);

        set({
            theme: newTheme,
            currentColorScheme: activeScheme,
        });
        console.log(`Theme set to: ${newTheme}. Active scheme: ${activeScheme}`);
    },

    initializeTheme: async () => {
        try {
            // 1. Load preference from AsyncStorage
            const storedTheme = (await AsyncStorage.getItem(THEME_KEY)) as Theme | null;
            const initialPreference: Theme = storedTheme || "system";

            // 2. Set the state based on the loaded preference
            set({
                theme: initialPreference,
                currentColorScheme: getActiveScheme(initialPreference),
            });

            // 3. Set up listener for system changes (only relevant if preference is 'system')
            Appearance.addChangeListener(({ colorScheme }) => {
                if (get().theme === "system") {
                    // Update the active scheme if the user prefers 'system' and the device changes
                    set({
                        currentColorScheme: colorScheme || "light",
                    });
                    console.log(`System theme changed. Active scheme updated to: ${colorScheme}`);
                }
            });
            console.log("Theme initialization complete.");
        } catch (e) {
            console.error("Error initializing theme from AsyncStorage:", e);
        }
    },
}));
