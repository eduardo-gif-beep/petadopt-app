import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
    if (!StorageService.validate('email', email)) {
        Alert.alert('Error', 'Correo inválido');
        console.log("error en correo");
        return false;
    }

    if (!StorageService.validate('password', password)) {
        Alert.alert('Error', 'Contraseña inválida (mínimo 8 caracteres, mayúscula, número)');
        console.log("error en contra");
        return false;
    }

    try {
        // MOCK LOGIN
        const fakeToken = "abc123TOKEN";

        await StorageService.saveToken('userToken', fakeToken);

        Alert.alert('Success', 'Login exitoso');
        console.log("LOGIN EXITOSO");

        setEmail('');
        setPassword('');

        return true; // 👈 CLAVE
    } catch (error) {
        console.log("Error en login:", error);
        return false;
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