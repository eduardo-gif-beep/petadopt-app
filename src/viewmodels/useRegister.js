import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";

export const useRegister = () => {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tienePatio, setTienePatio] = useState(false);

    const handleRegister = async () => {

        if (name.trim() === '' || lastName.trim() === '') {
            Alert.alert('Error', 'Nombre y apellido son obligatorios');
            return;
        }

        if (!StorageService.validate('email', email)) {
            Alert.alert('Error', 'Correo inválido');
            console.log("error en correo");
            
            return;
        }

        if (!StorageService.validate('password', password)) {
            Alert.alert('Error', 'Contraseña inválida (mínimo 8 caracteres, mayúscula, número)');
            console.log("error en contrra");
            return;
        }

        // MOCK REGISTER
        const newUser = {
            name,
            lastName,
            email,
            tienePatio
        };

        // Guardar usuario en AsyncStorage
        await StorageService.setItem('user', newUser);

        //prueba para saber si guarda en ASYNCSTORAGE
        //const savedUser = await StorageService.getItem('user');
        //console.log("Usuario guardado:", savedUser);

        Alert.alert('Success', 'Usuario registrado correctamente');
        setName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setTienePatio(false);
    };

    return {
        name,
        setName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        tienePatio,
        setTienePatio,
        handleRegister
    };
};