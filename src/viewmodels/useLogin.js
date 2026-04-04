import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";
import { loginService } from "../services/AuthService";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!StorageService.validate('email', email)) {
            Alert.alert('Error', 'Correo inválido');
            return { success: false };
        }

        if (!StorageService.validate('password', password)) {
            Alert.alert('Error', 'Contraseña inválida');
            return { success: false };
        }

        setLoading(true);

        try {
            const resultado = await loginService(email, password);

            if (resultado && resultado.token) {
                const decoded = jwtDecode(resultado.token);
                const isAdmin = decoded.user?.isAdmin || false;
                return { success: true, isAdmin: isAdmin };
            }

        } catch (error) {
            Alert.alert("Error", error.message);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        handleLogin
    };
};