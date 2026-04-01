import React from 'react';
import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAdminPets } from "../viewmodels/useAdminPets";

const PantallaAdminPets = ({ navigation }) => {
    const { pets, cargarPets } = useAdminPets();

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Pets Management (Admin)</Text>

            {/* <View style={styles.headerButtons}>
                <Button 
                    title="Añadir Mascota" 
                    onPress={() => navigation.navigate("RegisterPet")} 
                    color="#28a745"
                />
            </View> */}

            <FlatList
                data={pets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.tarjeta}>
                        <Text style={styles.idText}>ID: {item.id}</Text>
                        <Text style={styles.info}><Text style={styles.bold}>Name:</Text> {item.name}</Text>
                        <Text style={styles.info}><Text style={styles.bold}>Especie:</Text> {item.especie}</Text>
                        <Text style={styles.info}><Text style={styles.bold}>Age:</Text> {item.age}</Text>
                        <Text style={styles.info}><Text style={styles.bold}>Description:</Text> {item.description}</Text>
                        
                        <View style={styles.acciones}>
                            <TouchableOpacity style={styles.btnEditar}>
                                <Text style={styles.btnText}>EDIT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnEliminar}>
                                <Text style={styles.btnText}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <Button title="Recargar" onPress={cargarPets} color="#6c757d" />
                <Button title="Volver al Home" onPress={() => navigation.goBack()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa'
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    headerButtons: {
        marginBottom: 15
    },
    tarjeta: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 3
    },
    idText: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5
    },
    bold: {
        fontWeight: 'bold'
    },
    info: {
        fontSize: 15,
        marginBottom: 2
    },
    acciones: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        gap: 10
    },
    btnEditar: {
        backgroundColor: '#ffc107',
        padding: 8,
        borderRadius: 5
    },
    btnEliminar: {
        backgroundColor: '#dc3545',
        padding: 8,
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    },
    footer: {
        marginTop: 10,
        gap: 10
    }
});

export default PantallaAdminPets;