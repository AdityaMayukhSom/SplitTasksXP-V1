import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

// --- 1. INTERFACE DEFINITIONS ---

// Define the shape of the User object
interface User {
    id: string;
    name: string;
    email: string;
    // Add other properties you get from your login API response
}

// Define the state and actions of the User Store
interface UserStoreState {
    isLoggedIn: boolean;
    user: User | null;
    isLoadingAuth: boolean;

    // Actions
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
    initializeAuth: () => Promise<void>;
}

// --- 2. STORE IMPLEMENTATION ---

const TOKEN_KEY = "userAccessTokenKey";

export const useUserStore = create<UserStoreState>((set) => ({
    // State initialization
    isLoggedIn: false,
    user: null,
    isLoadingAuth: true,

    // 1. Check for token on app start
    initializeAuth: async () => {
        try {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if (token) {
                // Token found. In a real app, you might validate the token
                // and fetch user details here. For now, assume success.
                set({
                    isLoggedIn: true,
                    // user: decodedUser, // If you decode the JWT to get user info
                });
            }
        } catch (error) {
            console.error("SecureStore access failed:", error);
        } finally {
            // Set loading to false, allowing App.tsx to switch navigators
            set({ isLoadingAuth: false });
        }
    },

    // 2. Login (Store token securely and update state)
    login: async (token, user) => {
        // Save the token securely
        await SecureStore.setItemAsync(TOKEN_KEY, token);

        set({
            isLoggedIn: true,
            user: user,
            isLoadingAuth: false,
        });
    },

    // 3. Logout (Delete token securely and reset state)
    logout: async () => {
        // Delete the token securely
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        set({
            isLoggedIn: false,
            user: null,
            isLoadingAuth: false,
        });
    },
}));
