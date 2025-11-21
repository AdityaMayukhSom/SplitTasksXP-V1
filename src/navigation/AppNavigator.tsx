import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen } from "../screens/LoginScreen";
import { GroupsScreen } from "../screens/GroupsScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../store/useSettingsStore";
import { Text } from "react-native";

const AuthStack = createNativeStackNavigator();
const AppTabs = createBottomTabNavigator();

// --- AUTHENTICATION FLOW ---
export const AuthNavigator = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
    );
};

// --- MAIN APPLICATION FLOW (Tabs) ---
export const AppNavigator = () => {
    const colorScheme = useSettingsStore((state) => state.currentColorScheme);
    const isDark = colorScheme === "dark";

    return (
        <AppTabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === "GroupsTab") {
                        iconName = focused ? "file-tray-full" : "file-tray-full-outline";
                    } else if (route.name === "SettingsTab") {
                        iconName = focused ? "settings" : "settings-outline";
                    } else {
                        iconName = "help-circle-outline";
                    }

                    // You must install expo vector icons: npx expo install @expo/vector-icons
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: isDark ? "#8B5CF6" : "#4F46E5", // primary-dark / primary-light
                tabBarInactiveTintColor: isDark ? "#A1A1AA" : "#52525B", // gray-400 / gray-600
                tabBarStyle: {
                    backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                    borderTopColor: isDark ? "#374151" : "#E5E7EB",
                    paddingBottom: 4,
                    height: 55,
                },
            })}
        >
            <AppTabs.Screen name="GroupsTab" component={GroupsScreen} options={{ title: "Groups" }} />
            <AppTabs.Screen name="SettingsTab" component={SettingsScreen} options={{ title: "Settings" }} />
        </AppTabs.Navigator>
    );
};
