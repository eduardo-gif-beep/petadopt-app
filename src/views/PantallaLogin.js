import React from 'react';
import { 
    Image, 
    Platform, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    KeyboardAvoidingView, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard 
} from 'react-native';
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
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.mainContainer}
        >
            {/* Header Fijo */}
            <View style={styles.header}>
                <Text style={styles.tituloApp}>PetAdopt</Text>
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.logoContenedor}>
                        <Image source={LogoPetAdopt} style={styles.logoMascotas} resizeMode="contain" />
                    </View>

                    <View style={styles.pildoraLogo}>
                        <Text style={[styles.iconoPildoraTexto, {fontFamily: 'Poppins-Regular'}]}>🐶</Text>
                        <Text style={styles.textoPildora}>PetAdopt</Text>
                    </View>

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
                            placeholder="********"
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
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 100, // Espacio para que el header no tape el contenido inicial
        paddingBottom: 40,
    },
    header: {
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
        position: 'absolute',
        top: 0,
        zIndex: 10,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 20,
    },
    tituloApp: {
        fontFamily: 'Poppins-Bold',
        fontSize: 28,
        color: '#000000',
        letterSpacing: 1,
    },
    logoContenedor: {
        width: '100%',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoMascotas: {
        width: '70%',
        height: '100%',
    },
    pildoraLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#6FCF97',
        borderWidth: 2,
        borderRadius: 25,
        paddingVertical: 8,
        paddingHorizontal: 25,
        marginBottom: 30,
    },
    iconoPildoraTexto: {
        fontSize: 20,
        marginRight: 10,
    },
    textoPildora: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#000000',
    },
    seccionInputs: {
        width: '100%',
        marginBottom: 20,
    },
    labelInput: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#000000',
        marginBottom: 5,
        paddingLeft: 5,
    },
    input: {
        height: 48,
        width: '100%',
        backgroundColor: '#F0F0F0', // Un gris un poco más suave
        borderRadius: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#000000',
    },
    btnPrincipal: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    btnTexto: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
    },
    footer: {
        marginTop: 25,
        alignItems: 'center',
        width: '100%',
    },
    link: {
        color: '#000000',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        textDecorationLine: 'underline',
    }
});

export default PantallaLogin;