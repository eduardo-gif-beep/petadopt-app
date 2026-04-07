import { useState } from "react";
import { Alert } from "react-native";
import { validateRegisterForm } from '../helpers/authValidations';
import { registerService } from "../services/AuthService";

export const useRegister = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [income, setIncome] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [tienePatio, setTienePatio] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        const formData = { name, lastName, age, email, income, password, confirmPassword };
        const isValid = validateRegisterForm(formData);
        if (!isValid) return;

        try {
            setLoading(true);
            const respuesta = await registerService({
                name, lastName, age, income, email, password, tienePatio
            });
            Alert.alert("Éxito", respuesta.msg);
            return { success: true };

        } catch (error) {
            Alert.alert("Error de Registro", error.message);
            return { success: false };
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
        confirmPassword, setconfirmPassword,
        tienePatio, setTienePatio,
        loading, handleRegister
    };
};