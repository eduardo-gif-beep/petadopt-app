import { Button, StyleSheet, Text, TextInput, View, Switch } from 'react-native';
import { useRegister } from '../viewmodels/useRegister';

const PantallaRegister = () => {

    const {
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
    } = useRegister();

    return(
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Registro</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={lastName}
                onChangeText={setLastName}
            />

            <TextInput
                style={styles.input}
                placeholder="Correo Electronico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
            />

            <View style={styles.switchContainer}>
                <Text>¿Tienes patio?</Text>
                <Switch
                    value={tienePatio}
                    onValueChange={setTienePatio}
                />
            </View>

            <Button
                title="Registrarse"
                onPress={handleRegister}
                color='#007bff'
            />
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
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: '#333'
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#ffffff',
        fontSize: 16
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    }
});

export default PantallaRegister;