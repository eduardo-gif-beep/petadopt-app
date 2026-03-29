import { useState } from "react";
import { Alert } from "react-native";

// un hook es igual a encapsular toda la logica (login)
export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Please, all fields are required');
            return;
        }
        if(!email.includes('@')){
            Alert.alert('Error', 'Email is not correct')
            return;
        }

        //simulation 

        Alert.alert('Success', `successful login: ${email}`);

        setEmail('');
        setPassword('');
    }

    //retun the hook


    return{
        email,
        setEmail,
        password,
        setPassword,
        handleLogin
    }
}

