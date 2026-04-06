import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";
import { registerService } from "../services/AuthService";

export const useRegister = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [income, setIncome] = useState('');
    const [password, setPassword] = useState('');
    const [tienePatio, setTienePatio] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        // Validaciones básicas y Regex
        if (!name.trim() || !lastName.trim() || !age.trim() || !income.trim()) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return false;
        }

        if (!StorageService.validate('email', email)) {
            Alert.alert('Error', 'Correo inválido');
            return false;
        }

        if (!StorageService.validate('password', password)) {
            Alert.alert('Error', 'Contraseña inválida (mínimo 8 caracteres, mayúscula, número)');
            return false;
        }

        setLoading(true);

        try {
            const respuesta = await registerService({
                name, lastName, age, income, email, password, tienePatio
            });
            Alert.alert("Éxito", respuesta.msg);
            return { success: true};

        } catch (error) {
            Alert.alert("Error de Registro", error.message);
            return { success: false};
        } finally {
            setLoading(false);
        }
    };

    return {
        name, setName,
        lastName, setLastName,
        age, setAge,
        income, setIncome,
        email, setEmail,
        password, setPassword,
        tienePatio, setTienePatio,
        loading, handleRegister
    };
};