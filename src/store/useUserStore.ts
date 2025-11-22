import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { StorageKeys } from "../config/StorageKeys";

interface User {
    id: string;
    name: string;
    email: string;
}

interface UserStoreState {
    isLoggedIn: boolean;
    user: User | null;
    isLoadingAuth: boolean;

    // Actions
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
    initializeAuth: () => Promise<void>;
}

export const useUserStore = create<UserStoreState>((set) => ({
    isLoggedIn: false,
    user: null,
    isLoadingAuth: true,

    initializeAuth: async () => {
        set({ isLoadingAuth: true });

        try {
            const token = await SecureStore.getItemAsync(StorageKeys.AUTH_TOKEN_KEY);

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
            set({ isLoadingAuth: false });
        }
    },

    // 2. Login (Store token securely and update state)
    login: async (token, user) => {
        // Save the token securely
        await SecureStore.setItemAsync(StorageKeys.AUTH_TOKEN_KEY, token);

        set({
            user: user,
            isLoggedIn: true,
            isLoadingAuth: false,
        });
    },

    // 3. Logout (Delete token securely and reset state)
    logout: async () => {
        // Delete the token securely
        await SecureStore.deleteItemAsync(StorageKeys.AUTH_TOKEN_KEY);

        set({
            user: null,
            isLoggedIn: false,
            isLoadingAuth: false,
        });
    },
}));
