import React from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import { useUserStore } from "../store/useUserStore";

// Simple placeholder screen for the unauthenticated state
export const LoginScreen = () => {
    // Access the login action from the Zustand store
    const login = useUserStore((state) => state.login);

    const handleLogin = () => {
        // 1. Define the mock token (string)
        const mockToken = "mock-jwt-token-12345";

        // 2. Define the mock User object that MUST match the User interface in useUserStore.ts
        // This fixed the issue where the login action failed silently.
        const mockUser = {
            id: "temp-123",
            name: "Mock User",
            email: "mock.user@app.com",
        };

        // 3. Call the asynchronous login function
        login(mockToken, mockUser)
            .then(() => console.log("Mock login successful. Switching to AppNavigator."))
            .catch((error) => console.error("Login failed during mock process:", error));
    };

    return (
        <View className="flex-1 justify-center items-center p-6 bg-background-light dark:bg-background-dark">
            <StatusBar barStyle="default" />
            <Text className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">TODO App</Text>

            <Text className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
                Please sign in to view your groups and tasks.
            </Text>

            <TouchableOpacity
                onPress={handleLogin}
                className="w-full max-w-sm p-4 rounded-xl bg-primary-light dark:bg-primary-dark shadow-lg"
            >
                <Text className="text-center text-lg font-bold text-white">Sign In (Mock)</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
