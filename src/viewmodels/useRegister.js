import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";

export const useRegister = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState(''); 
    const [password, setPassword] = useState('');
    const [tienePatio, setTienePatio] = useState(false);

    const handleRegister = async () => {
        // Validaciones básicas y Regex
        if (!name.trim() || !lastName.trim() || !phone.trim() || !address.trim()) {
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

        try {
            const newUser = {
                id: `user_${Date.now()}`,
                name,
                lastName,
                phone,
                address,
                email,
                tienePatio,
                isAdmin: false
            };

            await StorageService.setItem('userData', newUser);
            
            await StorageService.saveToken('userToken', 'mock-jwt-token-from-register');

            Alert.alert('Success', 'Cuenta creada con éxito');
            return true;

        } catch (error) {
            console.log("Error en registro:", error);
            return false;
        }
    };

    return {
        name, setName,
        lastName, setLastName,
        email, setEmail,
        phone, setPhone,
        address, setAddress,
        password, setPassword,
        tienePatio, setTienePatio,
        handleRegister
    };
};