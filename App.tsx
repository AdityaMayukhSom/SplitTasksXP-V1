import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { StatusBar, View } from "react-native";
import "react-native-url-polyfill/auto";

import { AppNavigator, AuthNavigator } from "./src/navigation/AppNavigator";
import { LoadingScreen } from "./src/screens/LoadingScreen";
import { useSettingsStore } from "./src/store/useSettingsStore";
import { useUserStore } from "./src/store/useUserStore";

// 1. Initialize Query Client once outside the component tree
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

// Suppress known warning related to non-serializable objects in navigation state
// LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

// The main application root logic
const AppRoot = () => {
    // Use state and actions from the stores
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const isLoadingAuth = useUserStore((state) => state.isLoadingAuth);
    const initializeAuth = useUserStore((state) => state.initializeAuth);
    const initializeTheme = useSettingsStore((state) => state.initializeTheme);

    // Get the current color scheme for NativeWind
    const colorScheme = useSettingsStore((state) => state.currentColorScheme);
    const isDark = colorScheme === "dark";

    // Run initialization logic on component mount
    useEffect(() => {
        initializeAuth();
        initializeTheme();
    }, []);

    if (isLoadingAuth) {
        // Show the custom loading screen while we wait for SecureStore to check the token
        return <LoadingScreen />;
    }

    return (
        // FINAL FIX: Using View instead of the non-existent TailwindProvider
        <View style={{ flex: 1 }} className={`bg-background-light dark:bg-background-dark`}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            <NavigationContainer>
                {/* Conditional rendering based on auth state */}
                {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
        </View>
    );
};

// The top-level provider wrapper
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRoot />
        </QueryClientProvider>
    );
}
