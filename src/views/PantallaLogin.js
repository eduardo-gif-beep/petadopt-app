import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLogin } from '../viewmodels/useLogin';

const PantallaLogin = ({ navigation }) => {
    //deconstruir nuestro hook
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin
    } = useLogin();

    const onLoginPress = async () => {
        await handleLogin();
        navigation.replace("Pets");
    };
    
    return(
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Iniciar Sesion</Text>

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

            <Button
            title="Iniciar sesion"
            onPress={onLoginPress}
            color='#28a745'
            />

            <Text>
                ¿No tienes cuenta?
            </Text>

            <Button
                title="Ir a registro"
                onPress={() => navigation.navigate("Register")}
                color="#007bff"
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
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#ffffff',
        fontSize: 16
    }
});
export default PantallaLogin;