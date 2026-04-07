import React from 'react';
import { Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
        const result = await handleRegister(navigation);
        if (result && result.success) {
            navigation.replace("Login");
        }
    };

    return (
        <View style={styles.pantalla}>
            {/* Header con botón Back y Título */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.btnBack} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.textoBack}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.tituloHeader}>Create Account</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contenedor}>
                <Text style={styles.instrucciones}>Please complete the required fields:</Text>

                {/* Inputs con estilo de píldora gris (#D9D9D9) */}
                <TextInput
                    style={styles.input}
                    placeholder="NAME"
                    placeholderTextColor="#666"
                    value={name} // Usando 'name' del viewmodel para el nombre completo
                    onChangeText={setName}
                />

                  <TextInput
                    style={styles.input}
                    placeholder="LAST NAME"
                    placeholderTextColor="#666"
                    value={lastName} // Usando 'name' del viewmodel para el nombre completo
                    onChangeText={setLastName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="E-MAIL"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="AGE" // Mapeado a age según tu lógica actual
                    placeholderTextColor="#666"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="INCOME" // Mapeado a income según tu lógica actual
                    placeholderTextColor="#666"
                    value={income}
                    onChangeText={setIncome}
                />

                <TextInput
                    style={styles.input}
                    placeholder="PASSWORD"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />


                {/* Switch de Patio con estilo adaptado */}
                <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>¿Tiene patio o área?</Text>
                    <Switch
                        value={tienePatio}
                        onValueChange={setTienePatio}
                        trackColor={{ false: "#D9D9D9", true: "#6FCF97" }}
                        thumbColor={tienePatio ? "#FFFFFF" : "#f4f3f4"}
                    />
                </View>

                {/* Botón Sign Up estilo Píldora Verde (#6FCF97) */}
                <TouchableOpacity 
                    style={[styles.btnPrincipal, { opacity: loading ? 0.7 : 1 }]} 
                    onPress={onRegisterPress}
                    disabled={loading}
                >
                    <Text style={styles.textoBtn}>
                        {loading ? "Registering..." : "Sign Up"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    btnBack: {
        backgroundColor: '#6FCF97', // Verde Primario
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: '#000',
        marginRight: 15,
    },
    textoBack: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: '#000',
    },
    tituloHeader: {
        fontFamily: 'Poppins-Regular',
        fontSize: 20,
        color: '#000',
    },
    contenedor: {
        padding: 25,
        alignItems: 'center',
    },
    instrucciones: {
        fontFamily: 'Poppins-Regular',
        fontSize: 28,
        color: '#000',
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginBottom: 25,
        lineHeight: 35,
    },
    input: {
        width: '100%',
        height: 45,
        backgroundColor: '#D9D9D9', // Color Cards de tu paleta
        borderRadius: 25, // Forma de píldora de la imagen
        paddingHorizontal: 20,
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#000',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    switchText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: '#666',
    },
    btnPrincipal: {
        width: '70%',
        backgroundColor: '#6FCF97', // Verde Primario
        height: 50,
        borderRadius: 5, // Ligeramente redondeado como el botón de abajo en la imagen
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    textoBtn: {
        fontFamily: 'Poppins-Regular',
        fontSize: 22,
        color: '#000',
    }
});

export default PantallaRegister;