import React from 'react';
import { FlatList, Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useRequests } from "../viewmodels/useRequests";

const PantallaRequests = ({ navigation }) => {
    const { requests, recargar } = useRequests();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Requests / My Dashboard</Text>

            {requests.length === 0 ? (
                <Text style={styles.empty}>
                    No tienes solicitudes aún 🐾
                </Text>
            ) : (
                <FlatList
                    data={requests}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.petName}>{item.pet.name}</Text>
                                {/* Estilo dinámico según estado para UX */}
                                <View style={[styles.badge, 
                                    item.status === 'Aprobada' ? styles.badgeSuccess : styles.badgeWarning]}>
                                    <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
                                </View>
                            </View>

                            <Text style={styles.info}>Especie: {item.pet.especie}</Text>
                            <Text style={styles.motivoLabel}>Tu motivo:</Text>
                            <Text style={styles.motivoText}>"{item.motivo}"</Text>

                            <TouchableOpacity style={styles.btnDetail}>
                                <Text style={styles.btnText}>VER ESTADO DETALLADO</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            <View style={styles.footer}>
                <Button title="Actualizar" onPress={recargar} color="#6c757d" />
                <Button title="Volver al Catálogo" onPress={() => navigation.goBack()} color="#28a745" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: '#333'
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    petName: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#28a745'
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    badgeWarning: { backgroundColor: '#ffeeba' },
    badgeSuccess: { backgroundColor: '#d4edda' },
    badgeText: { fontSize: 10, fontWeight: 'bold' },
    info: { color: '#666', marginBottom: 5 },
    motivoLabel: { fontSize: 12, fontWeight: 'bold', marginTop: 5, color: '#444' },
    motivoText: { fontStyle: "italic", color: '#777', fontSize: 13 },
    btnDetail: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#e9ecef',
        borderRadius: 8,
        alignItems: 'center'
    },
    btnText: { fontSize: 12, fontWeight: 'bold', color: '#495057' },
    footer: { marginTop: 10, gap: 10 }
});

export default PantallaRequests;