import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!StorageService.validate('email', email)) {
            Alert.alert('Error', 'Correo inválido');
            return { success: false };
        }

        if (!StorageService.validate('password', password)) {
            Alert.alert('Error', 'Contraseña inválida');
            return { success: false };
        }

        try {
            const fakeToken = "abc123TOKEN";
            const user = {
                id: "user_001",
                email: email,
                isAdmin: email === "admin@test.com"
            };

            await StorageService.saveToken('userToken', fakeToken);
            await StorageService.setItem('userData', user);

            return { success: true};

        } catch (error) {
            console.log("Error en login:", error);
            return { success: false };
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin
    };
};