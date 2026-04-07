import { useEffect, useState } from "react";
import { getMyRequests } from "../services/AdoptionService";

export const useRecentRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchRequests = async () => {
        try {
            const data = await getMyRequests();
            setRequests(data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchRequests();
    };
     const formatDate = (date) => {
        return new
        Date(date).toLocaleDateString();
     };


    return { requests, loading, refreshing, onRefresh, formatDate};
};