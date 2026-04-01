import React from 'react';
import { Button, StyleSheet, Switch, Text, TextInput, View, ScrollView } from 'react-native';
import { useRegister } from '../viewmodels/useRegister';

const PantallaRegister = ({ navigation }) => {
    const {
        name, setName,
        lastName, setLastName,
        email, setEmail,
        phone, setPhone,
        address, setAddress,
        password, setPassword,
        tienePatio, setTienePatio,
        handleRegister
    } = useRegister();

    const onRegisterPress = async () => {
        const success = await handleRegister();
        if (success) {
            navigation.replace("Login");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.contenedor}>
            <Text style={styles.titulo}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="FIRST NAME"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="LAST NAME"
                value={lastName}
                onChangeText={setLastName}
            />

            <TextInput
                style={styles.input}
                placeholder="E-MAIL"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="PHONE"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <TextInput
                style={styles.input}
                placeholder="ADDRESS"
                value={address}
                onChangeText={setAddress}
            />

            <TextInput
                style={styles.input}
                placeholder="PASSWORD"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>¿Tienes patio o área para mascotas?</Text>
                <Switch
                    value={tienePatio}
                    onValueChange={setTienePatio}
                    trackColor={{ false: "#767577", true: "#28a745" }}
                />
            </View>

            <Button
                title="Registrarse"
                onPress={onRegisterPress}
                color='#28a745'
            />

            <View style={styles.footer}>
                <Text>¿Ya tienes cuenta?</Text>
                <Button
                    title="Ir a login"
                    onPress={() => navigation.goBack()}
                    color="#6c757d"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        padding: 25,
        backgroundColor: '#ffffff',
        flexGrow: 1,
        justifyContent: "center"
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: '#333'
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 12,
        backgroundColor: '#fafafa',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
        paddingHorizontal: 5
    },
    switchText: {
        fontSize: 14,
        color: '#555',
        flex: 1
    },
    footer: {
        marginTop: 20,
        gap: 10
    }
});

export default PantallaRegister;