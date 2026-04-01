import React from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useLogin } from '../viewmodels/useLogin';

const PantallaLogin = ({ navigation }) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin
    } = useLogin();

    const onLoginPress = async () => {
        const result = await handleLogin();
        if (result.success) {
            navigation.replace("Pets");
        }
    };

    return (
        <View style={styles.contenedor}>
            <Text style={styles.tituloApp}>PetAdopt</Text>

            <TextInput
                style={styles.input}
                placeholder="E-mail:"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password:"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
            />

            <Button
                title="Iniciar sesión" 
                onPress={onLoginPress}
                color='#28a745'
            />

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.link}>Create account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: '#f5f5f5'
    },
    tituloApp: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 40,
        textAlign: "center",
        color: '#28a745'
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#ffffff',
    },
    footer: {
        marginTop: 20,
        alignItems: 'center'
    },
    link: {
        color: '#007bff',
        fontSize: 16,
        textDecorationLine: 'underline'
    }
});

export default PantallaLogin;