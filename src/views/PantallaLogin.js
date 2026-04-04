import React from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useLogin } from '../viewmodels/useLogin';


const PantallaLogin = ({ navigation }) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        handleLogin
    } = useLogin();

    const onLoginPress = async () => {
        const result = await handleLogin(navigation);

        if (result && result.success) {
            if (result.isAdmin === true) {
            navigation.replace("Admin"); 
        } else {
            navigation.replace("Pets");
        }
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
                editable={!loading}
            />

            <TextInput
                style={styles.input}
                placeholder="Password:"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
                editable={!loading}
            />

            <Button
                title="Iniciar sesión"
                onPress={onLoginPress}
                color='#8f8f8f'
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
        padding: 40,
        justifyContent: "center",
        backgroundColor: '#FFFFFF'
    },
    tituloApp: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 40,
        textAlign: "center",
        color: '#000',
        letterSpacing: 2,
        textTransform: 'uppercase'
    },
    input: {
        height: 45,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 2, 
        paddingHorizontal: 12,
        marginBottom: 15,
        backgroundColor: '#FFF',
        fontSize: 14
    },
    btnPrincipal: {
        backgroundColor: '#000',
        paddingVertical: 12,
        borderRadius: 2,
        alignItems: 'center'
    },
    btnTexto: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 13
    },
    footer: {
        marginTop: 30,
        alignItems: 'center'
    },
    link: {
        color: '#666',
        fontSize: 13,
        textDecorationLine: 'underline'
    }
});

export default PantallaLogin;