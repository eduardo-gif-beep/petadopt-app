import { useState } from "react";

export const usePets = () => {

    const [pets] = useState([
        { id: "1", name: "Rex", especie: "Perro" },
        { id: "2", name: "Michi", especie: "Gato" }
    ]);

    return {
        pets
    };
};