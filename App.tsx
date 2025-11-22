import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { StatusBar, View } from "react-native";
import "react-native-url-polyfill/auto";

import { AppNavigator, AuthNavigator } from "./src/navigation/AppNavigator";
import { LoadingScreen } from "./src/screens/LoadingScreen";
import { useThemeStore } from "./src/store/useThemeStore";
import { useUserStore } from "./src/store/useUserStore";
import "./global.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

export const App = () => {
    const auth = useUserStore();
    const theme = useThemeStore();

    useEffect(() => {
        auth.initializeAuth();
        theme.initializeTheme();
    }, []);

    if (auth.isLoadingAuth) {
        // Show the custom loading screen while we wait for SecureStore to check the token
        return <LoadingScreen />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <View style={{ flex: 1 }} className={`bg-background-light dark:bg-background-dark`}>
                <StatusBar barStyle={theme.isDark() ? "light-content" : "dark-content"} />

                <NavigationContainer>
                    {/* Depending upon whether logged in or not */}
                    {auth.isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            </View>
        </QueryClientProvider>
    );
};
