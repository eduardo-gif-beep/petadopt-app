import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { getUserProfile, logoutUser } from "../services/AdoptionService";

export const useProfile = (navigation) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadProfile = async () => {
        try {
            const data = await getUserProfile();
            setUser(data);
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handleLogout = async () => {
        Alert.alert("Log out", "Are you sure you want to exit?", [
            { text: "Cancel", style: "cancel" },
            { 
                text: "Yes, Log out", 
                style: "destructive", 
                onPress: async () => {
                    await logoutUser();
                    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                } 
            }
        ]);
    };

    return { user, loading, handleLogout };
};