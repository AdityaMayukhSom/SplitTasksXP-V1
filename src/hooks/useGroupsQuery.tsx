// src/hooks/useGroupsQuery.ts

import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../api/groups";

// Define a unique, consistent key for caching this data
const GROUPS_QUERY_KEY = ["groups"];

export const useGroupsQuery = () => {
    return useQuery({
        queryKey: GROUPS_QUERY_KEY,
        queryFn: fetchGroups,
        // Note: staleTime is already set globally in App.tsx, but can be overridden here.
    });
};
