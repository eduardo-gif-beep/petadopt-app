import React from 'react';
import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { usePets } from "../viewmodels/usePets";

const PantallaPets = ({ navigation }) => {
    const { pets, isAdmin } = usePets();

    return (
        <View style={styles.container}>
            <Text style={styles.brand}>PetAdopt</Text>
            <Text style={styles.title}>Pets for adoption</Text>

            <FlatList
                data={pets}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.placeholderImagen} /> 
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.info}>{item.especie} • {item.age}</Text>
                        
                        <TouchableOpacity 
                            style={styles.btnView}
                            onPress={() => navigation.navigate("Request", { pet: item })}
                        >
                            <Text style={styles.btnText}>VIEW / ADOPT</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate("Requests")}>
                    <Text style={styles.navText}>My Requests</Text>
                </TouchableOpacity>

                {isAdmin && (
                    <TouchableOpacity 
                        style={styles.adminBadge}
                        onPress={() => navigation.navigate("Admin")}
                    >
                        <Text style={styles.navTextAdmin}>Panel Admin</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    brand: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#28a745',
        textAlign: 'center'
    },
    title: {
        fontSize: 18,
        marginVertical: 15,
        textAlign: "center",
        color: '#555'
    },
    card: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#eee',
        alignItems: 'center'
    },
    placeholderImagen: {
        width: '100%',
        height: 120,
        backgroundColor: '#ddd',
        borderRadius: 8,
        marginBottom: 10
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#333'
    },
    info: {
        color: '#777',
        marginBottom: 10
    },
    btnView: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    navText: {
        color: '#007bff',
        fontWeight: '600'
    },
    adminBadge: {
        backgroundColor: '#fff3cd',
        paddingHorizontal: 10,
        borderRadius: 5
    },
    navTextAdmin: {
        color: '#856404',
        fontWeight: 'bold'
    }
});

export default PantallaPets;