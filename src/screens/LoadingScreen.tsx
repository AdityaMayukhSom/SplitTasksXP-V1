import { Text, View, ActivityIndicator, StatusBar } from "react-native";

// This screen is shown while the app initializes and checks for the user token
export const LoadingScreen = () => {
    return (
        <View className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
            <StatusBar barStyle="default" />
            <ActivityIndicator size="large" className="text-primary-light dark:text-primary-dark mb-4" />
            <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">Loading application data...</Text>
        </View>
    );
};
