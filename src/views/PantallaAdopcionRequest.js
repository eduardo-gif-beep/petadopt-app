import React from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useAdoptionRequest } from '../viewmodels/useAdoptionRequest';

const PantallaAdopcionRequest = ({ route, navigation }) => {
    // Recibimos la mascota seleccionada por parámetros de navegación
    const { pet } = route.params; 
    
    const {
        motivo, setMotivo,
        ingresos, setIngresos,
        tienePatio, setTienePatio,
        isSubmitting,
        enviarSolicitud
    } = useAdoptionRequest();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Proceso de Adopción</Text>
            
            <View style={styles.petCard}>
                <Text style={styles.petTitle}>Estas aplicando para: {pet.name}</Text>
                <Text style={styles.petSub}>{pet.especie} • {pet.age}</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>¿Por qué quieres adoptar a esta mascota?</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Cuéntanos un poco sobre tu hogar..."
                    value={motivo}
                    onChangeText={setMotivo}
                    multiline
                    numberOfLines={4}
                />

                <Text style={styles.label}>Ingresos mensuales aproximados (USD/MXN):</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. 15000"
                    value={ingresos}
                    onChangeText={setIngresos}
                    keyboardType="numeric"
                />

                <View style={styles.switchRow}>
                    <Text style={styles.label}>¿Cuentas con patio o área verde?</Text>
                    <Switch
                        value={tienePatio}
                        onValueChange={setTienePatio}
                        trackColor={{ false: "#767577", true: "#28a745" }}
                    />
                </View>

                {isSubmitting ? (
                    <ActivityIndicator size="large" color="#28a745" />
                ) : (
                    <Button 
                        title="ENVIAR SOLICITUD" 
                        onPress={() => enviarSolicitud(pet, navigation)}
                        color="#28a745"
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333'
    },
    petCard: {
        backgroundColor: '#f0f9f1',
        padding: 15,
        borderRadius: 10,
        marginBottom: 25,
        borderLeftWidth: 5,
        borderLeftColor: '#28a745'
    },
    petTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    petSub: {
        color: '#666'
    },
    form: {
        gap: 10
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 5,
        color: '#555'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#fafafa'
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top'
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30
    }
});

export default PantallaAdopcionRequest;