import { useState } from "react";

export const useRequests = () => {

    const [requests, setRequests] = useState([
        { id: "1", pet: "Rex", status: "pendiente" },
        { id: "2", pet: "Michi", status: "aprobado" }
    ]);

    return {
        requests
    };
};