import React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LogoPetAdopt from '../images/logo.png';
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
            {/* Header con el título, centrado */}
            <View style={styles.header}>
                <Text style={styles.tituloApp}>PetAdopt</Text>
            </View>

            <View style={styles.logoContenedor}>
                <Image source={LogoPetAdopt} style={styles.logoMascotas} resizeMode="contain" />
            </View>

            <View style={styles.pildoraLogo}>
                 <Text style={[styles.iconoPildoraTexto, {fontFamily: 'Poppins-Regular'}]}>🐶</Text>

                <Text style={styles.textoPildora}>PetAdopt</Text>
            </View>

            {/* Inputs con labels (image_2.png) */}
            <View style={styles.seccionInputs}>
                <Text style={styles.labelInput}>E-mail:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="example@mail.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />

                <Text style={styles.labelInput}>Password:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="lalito1234"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    editable={!loading}
                />
            </View>

            <TouchableOpacity 
                style={[styles.btnPrincipal, { backgroundColor: loading ? '#D9D9D9' : '#6FCF97' }]} 
                onPress={onLoginPress} 
                disabled={loading}
            >
                <Text style={styles.btnTexto}>{loading ? "Cargando..." : "Log In"}</Text>
            </TouchableOpacity>

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
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    header: {
        width: '111%',
        alignItems: 'center',
        paddingBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    tituloApp: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        color: '#000000',
        letterSpacing: 1,

    },
    logoContenedor: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40,
    },
    logoMascotas: {
        width: '80%',
        height: '100%',
    },
    pildoraLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#6FCF97',
        borderWidth: 2,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginBottom: 40,
        elevation: 1,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, // Pequeña sombra (iOS)
    },
    iconoPildoraTexto: {
        fontSize: 24,
        color: '#6FCF97',
        marginRight: 15,
    },
    iconoPildoraImage: {
        width: 24, height: 24,
        marginRight: 15,
    },
    textoPildora: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: '#000000',
    },
    seccionInputs: {
        width: '100%',
        marginBottom: 30,
    },
    labelInput: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#000000',
        marginBottom: 8,
        paddingLeft: 5,
    },
    input: {
        height: 45,
        width: '100%',
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#000000',
  
    },
    btnPrincipal: {
        width: '60%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, // Sombra más prominente
    },
    btnTexto: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        // No uppercase
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
    },
    link: {
        color: '#000000',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        textDecorationLine: 'none',
    }
});

export default PantallaLogin;