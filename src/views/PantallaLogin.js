// PANTALLA LOGIN ACTUALLIZADA
import React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Asegúrate de importar los recursos de imagen correctos según tu estructura de carpetas
// src/images/logo.png existe, pero el icono de 'hueso' no se ve explícitamente en la estructura,
// asumiré que tienes un 'ic_bone.png' en la misma carpeta, o usa un Material Icon si ya tienes instalada esa librería.
// Para este ejemplo, usaré un placeholder si no existe 'ic_bone.png', pero aquí está cómo lo enlazarías.
import LogoPetAdopt from '../images/logo.png';
// Si no tienes el icono de hueso como PNG, usaremos un icono de la comunidad (requiere instalación):
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// O, si lo tienes como imagen:
// import IcBone from '../images/ic_bone.png';

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

            {/* Logo de Mascotas central (perro y gato) */}
            <View style={styles.logoContenedor}>
                <Image source={LogoPetAdopt} style={styles.logoMascotas} resizeMode="contain" />
            </View>

            {/* Sub-logo pill con icono de hueso (imagen_2.png) */}
            <View style={styles.pildoraLogo}>
                {/* Usaremos un icono de texto para el hueso, o un PNG si lo tienes */}
                {/* Opción A: Usando Material Community Icons (más limpio, si lo tienes) */}
                {/* <MaterialCommunityIcons name="bone" size={24} color="#6FCF97" style={styles.iconoPildora} /> */}
                
                {/* Opción B: Usando un placeholder de imagen (como se pidió con rutas) */}
                {/* Asumiremos que ic_bone.png existe en src/images. Si no, usa el placeholder */}
                {/* <Image source={IcBone} style={styles.iconoPildoraImage} resizeMode="contain" /> */}

                {/* Opción C: Un placeholder de texto verde para el hueso si no hay icono */}
                 <Text style={[styles.iconoPildoraTexto, {fontFamily: 'Poppins-Regular'}]}>🐶</Text>

                <Text style={styles.textoPildora}>PetAdopt</Text>
            </View>

            {/* Inputs con labels (image_2.png) */}
            <View style={styles.seccionInputs}>
                <Text style={styles.labelInput}>E-mail:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="example@mail.com" // Placeholder útil (opcional, image_2.png lo tiene vacío)
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />

                <Text style={styles.labelInput}>Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="••••••••" // Placeholder útil (opcional)
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    editable={!loading}
                />
            </View>

            {/* Botón de Iniciar Sesión estilo pildora verde (image_2.png) */}
            {/* Reemplazamos Button por TouchableOpacity para control de diseño */}
            <TouchableOpacity 
                style={[styles.btnPrincipal, { backgroundColor: loading ? '#D9D9D9' : '#6FCF97' }]} 
                onPress={onLoginPress} 
                disabled={loading}
            >
                <Text style={styles.btnTexto}>{loading ? "Cargando..." : "Log In"}</Text>
            </TouchableOpacity>

            {/* Footer con enlace de registro */}
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
        alignItems: 'center', // Centrado horizontal global
        backgroundColor: '#FFFFFF', // Blanco de fondo
        paddingHorizontal: 20, // Padding lateral de la pantalla
        paddingTop: Platform.OS === 'ios' ? 60 : 40, // Espacio superior para el header
    },
    header: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 40, // Espacio para el header
        borderBottomWidth: 1, // Línea divisoria superior (image_2.png)
        borderBottomColor: '#D9D9D9',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    tituloApp: {
        fontFamily: 'Poppins-Bold', // Tipografía Poppins
        fontSize: 32, // Título grande
        color: '#000000', // Negro de texto
        letterSpacing: 1, // Espaciado entre letras ligero (no exagerado como antes)
        // No uppercase, según image_2.png
    },
    logoContenedor: {
        width: '100%',
        height: 150, // Ajusta la altura del logo
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40, // Espacio arriba y abajo del logo
    },
    logoMascotas: {
        width: '80%', // El logo ocupa gran parte del ancho
        height: '100%',
    },
    pildoraLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // Blanco
        borderColor: '#6FCF97', // Verde Primario borde
        borderWidth: 2,
        borderRadius: 25, // Forma de píldora
        paddingVertical: 10,
        paddingHorizontal: 30, // Espaciado interno horizontal
        marginBottom: 40, // Espacio antes de los inputs
        elevation: 1, // Pequeña sombra (Android)
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, // Pequeña sombra (iOS)
    },
    iconoPildoraTexto: {
        fontSize: 24, // Tamaño emoji/icono
        color: '#6FCF97', // Verde si es texto/MaterialIcon
        marginRight: 15,
    },
    iconoPildoraImage: {
        width: 24, height: 24,
        marginRight: 15,
    },
    textoPildora: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: '#000000', // Texto negro
    },
    seccionInputs: {
        width: '100%',
        marginBottom: 30, // Espacio antes del botón
    },
    labelInput: {
        fontFamily: 'Poppins-Medium', // Tipografía Poppins
        fontSize: 14,
        color: '#000000', // Negro texto label
        marginBottom: 8, // Espacio entre label e input
        paddingLeft: 5,
    },
    input: {
        height: 45,
        width: '100%',
        backgroundColor: '#D9D9D9', // Gris oscuro para cards/inputs (como base)
        borderRadius: 20, // Borde redondeado
        paddingHorizontal: 20,
        marginBottom: 20, // Espacio entre inputs
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#000000', // Texto negro dentro
        // Quitar bordes negros
    },
    btnPrincipal: {
        width: '60%', // Ancho como el botón en image_2.png
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24, // Forma de píldora
        // Quitar bordes negros
        elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, // Sombra más prominente
    },
    btnTexto: {
        color: '#FFFFFF', // Blanco para texto de botón
        fontFamily: 'Poppins-SemiBold', // Poppins Negrita
        fontSize: 16,
        // No uppercase
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
    },
    link: {
        color: '#000000', // Negro texto, o usar '#6FCF97' si prefieres el verde
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        textDecorationLine: 'none', // Quitar subrayado, o dejarlo si image_2.png tiene (parece no tener)
    }
});

export default PantallaLogin;