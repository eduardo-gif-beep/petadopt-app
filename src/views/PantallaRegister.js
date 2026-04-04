import React from 'react';
import { Button, StyleSheet, Switch, Text, TextInput, View, ScrollView } from 'react-native';
import { useRegister } from '../viewmodels/useRegister';

const PantallaRegister = ({ navigation }) => {
    const {
        name, setName,
        lastName, setLastName,
        email, setEmail,
        age, setAge,
        income, setIncome,
        password, setPassword,
        tienePatio, setTienePatio,
        loading, handleRegister
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
                placeholder="AGE"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="INCOME"
                value={income}
                onChangeText={setIncome}
                keyboardType="numeric"
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
                title={loading ? "Registrando..." : "Crear Cuenta"}
                onPress={onRegisterPress}
                color='#8f8f8f'
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
        padding: 30,
        backgroundColor: '#FFFFFF',
        flexGrow: 1,
        justifyContent: "center"
    },
    titulo: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 30,
        textAlign: "left",
        color: '#000',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 2,
        paddingHorizontal: 12,
        marginBottom: 12,
        backgroundColor: '#FFF',
        fontSize: 13
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 2
    },
    switchText: {
        fontSize: 12,
        color: '#666',
        textTransform: 'uppercase',
        fontWeight: '500'
    },
    footer: {
        marginTop: 30,
        paddingTop: 20,
        borderTopWidth: 1,
        borderColor: '#EEE',
        gap: 5
    },
    btnPrincipal: {
        backgroundColor: '#000',
        paddingVertical: 12,
        borderRadius: 2,
        alignItems: 'center',
        marginBottom: 10
    },
    btnSecundario: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        alignItems: 'center'
    },
    textoBtnPrincipal: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 13,
        textTransform: 'uppercase'
    },
    textoBtnSecundario: {
        color: '#000',
        fontWeight: '600',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    footerLabel: {
        textAlign: 'center',
        fontSize: 11,
        color: '#AAA',
        marginBottom: 10,
        textTransform: 'uppercase'
    }
});

export default PantallaRegister;