import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!StorageService.validate('email', email)) {
            Alert.alert('Error', 'Correo inválido');
            return;
        }

        if (!StorageService.validate('password', password)) {
            Alert.alert('Error', 'Contraseña inválida (mínimo 8 caracteres, mayúscula, número)');
            return;
        }

        // MOCK LOGIN
        const fakeToken = "abc123TOKEN";

        await StorageService.saveToken('userToken', fakeToken);

        Alert.alert('Success', 'Login exitoso');
        console.log("LOGIN ESIsTOSO")
        setEmail('');
        setPassword('');
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin
    };
};