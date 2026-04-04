import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { getAllRequests, updateRequestStatus } from "../services/AdminService";

export const useAdminRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadRequests = async () => {
        try {
            const data = await getAllRequests();
            setRequests(data);
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar las solicitudes");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateRequestStatus(id, newStatus);
            Alert.alert("Éxito", `Solicitud ${newStatus}`);
            loadRequests();
        } catch (error) {
            Alert.alert("Error", "No se pudo actualizar el estado");
        }
    };

    useEffect(() => { loadRequests(); }, []);

    return { requests, loading, handleStatusUpdate };
};