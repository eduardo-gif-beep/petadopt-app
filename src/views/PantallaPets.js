import React, { useCallback } from 'react'; // 1. Importa useCallback
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, RefreshControl, Image } from "react-native";
import { useFocusEffect } from '@react-navigation/native'; // 2. Importa useFocusEffect
import { usePets } from "../viewmodels/usePets";

const PantallaPets = ({ navigation }) => {
    const { pets, isAdmin, loading, refrescar } = usePets();

    useFocusEffect(
        useCallback(() => {
            refrescar(); 
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.brand}>PetAdopt</Text>
            <Text style={styles.title}>Pets for adoption</Text>

            {loading && pets.length === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#28a745" />
                    <Text style={styles.loadingText}>Loading pets...</Text>
                </View>
            ) : (
                <FlatList
                    data={pets}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={refrescar}
                            colors={['#28a745']}
                        />
                    }
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No pets available at the moment.</Text>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            {item.imageUrl ? (
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    style={styles.petImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <View style={styles.placeholderImagen}>
                                    <Text style={{ color: '#999' }}>No Image</Text>
                                </View>
                            )}

                            <View style={styles.infoWrapper}>
                                <Text style={styles.name}>{item.name}</Text>

                                <Text style={styles.info}>
                                    {item.especie} • {item.age} • {item.gender}
                                </Text>

                                <Text style={styles.subInfo}>
                                    Size: {item.size} | Color: {item.color}
                                </Text>

                                <Text style={styles.status}>{item.status}</Text>

                                <TouchableOpacity
                                    style={styles.btnView}
                                    onPress={() => navigation.navigate("Request", { pet: item })}
                                >
                                    <Text style={styles.btnText}>VIEW / ADOPT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}

            <View style={styles.navBar}>
                {!isAdmin && (
                    <TouchableOpacity onPress={() => navigation.navigate("Requests")}>
                        <Text style={styles.navText}>My Requests</Text>
                    </TouchableOpacity>
                )}
                
                <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("Profile")}>
                    <Text>Profile</Text>
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
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 12,
        color: '#000',
        textTransform: 'uppercase'
    },
    brand: {
        fontSize: 14,
        fontWeight: "400",
        color: '#AAA',
        textAlign: 'center',
        marginTop: 40,
        letterSpacing: 3,
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginVertical: 10,
        textAlign: "center",
        color: '#000'
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 2,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden'
    },
    petImage: {
        width: '100%',
        height: 160,
        backgroundColor: '#F3F4F6'
    },
    placeholderImagen: {
        width: '100%',
        height: 160,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#E5E7EB'
    },
    infoWrapper: {
        padding: 16,
        alignItems: 'flex-start'
    },
    name: {
        fontSize: 18,
        fontWeight: "700",
        color: '#000',
        textTransform: 'uppercase'
    },
    info: {
        fontSize: 13,
        color: '#4B5563',
        marginTop: 4,
        fontWeight: '500'
    },
    subInfo: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 2,
        marginBottom: 12
    },
    status: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
        textTransform: 'uppercase',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginBottom: 15,
        alignSelf: 'flex-start'
    },
    btnView: {
        width: '100%',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        alignItems: 'center'
    },
    btnText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#000',
        letterSpacing: 1
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff'
    },
    navText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '700',
        textDecorationLine: 'underline'
    },
    adminBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2
    },
    navTextAdmin: {
        color: '#000',
        fontSize: 11,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#999',
        fontSize: 14
    }
});
export default PantallaPets;