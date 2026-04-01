import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRegisterPet } from '../viewmodels/useRegisterPet';

const PantallaRegisterPet = ({ navigation }) => {
    const {
        name, setName,
        especie, setEspecie,
        age, setAge,
        description, setDescription,
        isLoading,
        handleRegisterPet
    } = useRegisterPet();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Registrar Nueva Mascota</Text>
            <Text style={styles.subtitulo}>Panel de Administración</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Nombre de la mascota:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. Bobby"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Especie:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. Perro (Labrador)"
                    value={especie}
                    onChangeText={setEspecie}
                />

                <Text style={styles.label}>Edad:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. 3 años o 2 meses"
                    value={age}
                    onChangeText={setAge}
                />

                <Text style={styles.label}>Descripción detallada:</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describe su personalidad y salud..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={5}
                />

                {isLoading ? (
                    <ActivityIndicator size="large" color="#28a745" />
                ) : (
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="GUARDAR MASCOTA" 
                            onPress={() => handleRegisterPet(navigation)}
                            color="#28a745"
                        />
                        <View style={{ height: 10 }} />
                        <Button 
                            title="CANCELAR" 
                            onPress={() => navigation.goBack()}
                            color="#dc3545"
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: '#fff',
        flexGrow: 1
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333'
    },
    subtitulo: {
        fontSize: 14,
        textAlign: 'center',
        color: '#28a745',
        marginBottom: 30,
        fontWeight: '600'
    },
    form: {
        width: '100%'
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#555'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        fontSize: 16
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top'
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default PantallaRegisterPet;