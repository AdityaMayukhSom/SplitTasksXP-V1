import { Text, View, ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
// Import the custom hook created in src/hooks/useGroupsQuery.ts
import { useGroupsQuery } from "../hooks/useGroupsQuery";

// --- DEFINITIONS FOR GroupCard ---

// FIX 1: Define the props interface to satisfy TypeScript
interface GroupCardProps {
    id: number;
    name: string;
    tasks: number;
    color: string;
}

// FIX 2: Define the GroupCard component
const GroupCard: React.FC<GroupCardProps> = ({ name, tasks, color }) => (
    // FIX 3: Use backticks (`) for the className template literal
    <View className={`p-5 mb-4 rounded-xl shadow-md bg-white dark:bg-gray-800 border-l-4 ${color}`}>
        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">{name}</Text>
        <Text className="text-md text-gray-500 dark:text-gray-400">{tasks} pending tasks</Text>
    </View>
);

// --- GROUPS SCREEN COMPONENT ---

export const GroupsScreen = () => {
    // Use the hook to manage state, loading, and data
    const { data: groups = [], isLoading, isError, error } = useGroupsQuery();

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
                <ActivityIndicator size="large" className="text-primary-light dark:text-primary-dark" />
                <Text className="text-lg text-gray-600 dark:text-gray-400 mt-3">Fetching groups...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark p-6">
                <Text className="text-xl font-bold text-red-500 mb-2">Error Loading Groups</Text>
                <Text className="text-center text-gray-600 dark:text-gray-400">
                    {(error as Error).message || "Could not connect to the server."}
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
            <ScrollView className="p-4">
                <Text className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">{"Your Groups"}</Text>

                {groups.map((group) => (
                    <GroupCard key={group.id} id={group.id} name={group.name} tasks={group.tasks} color={group.color} />
                ))}

                <View className="h-20" />
            </ScrollView>
        </SafeAreaView>
    );
};
