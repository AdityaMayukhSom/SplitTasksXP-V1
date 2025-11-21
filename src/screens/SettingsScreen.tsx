import { useSettingsStore } from "../store/useSettingsStore";
import { useUserStore } from "../store/useUserStore";
import { Text, View, TouchableOpacity, Switch, SafeAreaView } from "react-native";

export const SettingsScreen = () => {
    const { theme, setTheme } = useSettingsStore((state) => ({
        theme: state.theme,
        setTheme: state.setTheme,
    }));
    const logout = useUserStore((state) => state.logout); // 👈 Action from User Store

    const isDark = theme === "dark";

    const handleThemeToggle = () => {
        // Calls the action defined in useSettingsStore
        setTheme(isDark ? "light" : "dark");
    };

    const handleLogout = async () => {
        // 👈 Make this async if Keychain actions are async
        await logout();
        // Navigation will automatically switch due to the isLoggedIn state change in App.tsx
    };

    // Define the specific HEX colors (using your defined Tailwind aliases now)
    const ACTIVE_COLOR_LIGHT = "#4F46E5"; // primary-light
    const ACTIVE_COLOR_DARK = "#8B5CF6"; // primary-dark

    // Determine the correct thumb color based on the current scheme
    const thumbActiveColor = isDark ? ACTIVE_COLOR_DARK : ACTIVE_COLOR_LIGHT;

    return (
        // Use the defined background aliases
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
            <View className="p-4">
                <Text className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white">Settings</Text>

                {/* Theme Toggle Section */}
                <View className="flex-row items-center justify-between p-4 mb-4 rounded-xl bg-gray-100 dark:bg-gray-800">
                    <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Dark Mode ({isDark ? "On" : "Off"})
                    </Text>
                    <Switch
                        // The track colors are hardcoded here, but should ideally match your theme.
                        // Using placeholder hex values for now.
                        trackColor={{ false: "#767577", true: thumbActiveColor }}
                        thumbColor={thumbActiveColor}
                        onValueChange={handleThemeToggle} // 👈 Connected to setTheme
                        value={isDark}
                    />
                </View>

                {/* Logout Section */}
                <TouchableOpacity
                    onPress={handleLogout} // 👈 Connected to logout action
                    className="flex-row items-center justify-center p-4 rounded-xl bg-red-500 shadow-lg mt-8"
                >
                    <Text className="text-lg font-bold text-white">Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
