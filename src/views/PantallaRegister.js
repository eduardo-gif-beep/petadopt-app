import React from 'react';
import { 
    Platform, 
    ScrollView, 
    StyleSheet, 
    Switch, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    Keyboard 
} from 'react-native';
import { useRegister } from '../viewmodels/useRegister';

const PantallaRegister = ({ navigation }) => {
    const {
        name, setName,
        lastName, setLastName,
        email, setEmail,
        age, setAge,
        income, setIncome,
        password, setPassword,
        confirmPassword, setconfirmPassword,
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
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.pantalla}
        >
            {/* Header fijo arriba */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.btnBack} 
                    onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Login")}
                >
                    <Text style={styles.textoBack}>← Back</Text>
                </TouchableOpacity>
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView 
                    contentContainerStyle={styles.contenedorScroll}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.instrucciones}>Create an Account</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="NAME"
                        placeholderTextColor="#666"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="LAST NAME"
                        placeholderTextColor="#666"
                        value={lastName}
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
                        placeholder="AGE"
                        placeholderTextColor="#666"
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="INCOME (MOUNTHLY)"
                        placeholderTextColor="#666"
                        value={income}
                        onChangeText={setIncome}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="PASSWORD"
                        placeholderTextColor="#666"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="CONFIRM PASSWORD"
                        placeholderTextColor="#666"
                        value={confirmPassword}
                        onChangeText={setconfirmPassword}
                        secureTextEntry={true}
                    />

                    <View style={styles.switchContainer}>
                        <Text style={styles.switchText}>Do you have Yard / Garden?</Text>
                        <Switch
                            value={tienePatio}
                            onValueChange={setTienePatio}
                            trackColor={{ false: "#D9D9D9", true: "#6FCF97" }}
                            thumbColor={tienePatio ? "#FFFFFF" : "#f4f3f4"}
                        />
                    </View>

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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        backgroundColor: '#FFFFFF',
        zIndex: 10,
    },
    btnBack: {
        backgroundColor: '#6FCF97',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    textoBack: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    tituloHeader: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: '#000',
        marginLeft: 20,
    },
    contenedorScroll: {
        padding: 25,
        alignItems: 'center',
        paddingBottom: 50,
    },
    instrucciones: {
        fontFamily: 'Poppins-Regular',
        fontSize: 26,
        color: '#000',
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#F2F2F2',
        borderRadius: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#000',
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 15,
        paddingHorizontal: 5,
    },
    switchText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#444',
    },
    btnPrincipal: {
        width: '100%', // Un poco más ancho para que sea fácil de presionar
        backgroundColor: '#6FCF97',
        height: 55,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        // Sombra para Android/iOS
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    textoBtn: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold'
    }
});

export default PantallaRegister;