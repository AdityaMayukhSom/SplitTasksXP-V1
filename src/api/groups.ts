interface GroupCardProps {
    id: number;
    name: string;
    tasks: number;
    color: string;
}

const mockGroupData: Array<GroupCardProps> = [
    {
        id: 1,
        name: "Work Project A",
        tasks: 12,
        color: "border-indigo-500",
    },
    {
        id: 2,
        name: "Personal Errands",
        tasks: 5,
        color: "border-green-500",
    },
    {
        id: 3,
        name: "Family Chores",
        tasks: 8,
        color: "border-pink-500",
    },
    {
        id: 4,
        name: "Hobby & Learnings",
        tasks: 3,
        color: "border-yellow-500",
    },
];

// TODO: This is the mock function that will be replaced by a real API call later
export const fetchGroups = async (): Promise<GroupCardProps[]> => {
    console.log("Fetching groups...");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockGroupData);
        }, 1000);
    });
};
