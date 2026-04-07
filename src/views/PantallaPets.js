import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePets } from "../viewmodels/usePets";

const PantallaPets = ({ navigation }) => {
    const { pets, isAdmin, loading, refrescar, eliminarMascota } = usePets();

    useFocusEffect(
        useCallback(() => {
            refrescar();
        }, [])
    );

    return (
        <View style={styles.container}>
            {/* Header Estilizado */}
            <View style={styles.header}>
                <Text style={styles.brand}>PetAdopt</Text>
                <Text style={styles.title}>Pets for adoption</Text>
            </View>

            {loading && pets.length === 0 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6FCF97" />
                    <Text style={styles.loadingText}>Loading furry friends...</Text>
                </View>
            ) : (
                <FlatList
                    data={pets}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={refrescar}
                            colors={['#6FCF97']}
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
                                    <Text style={styles.placeholderText}>No Image</Text>
                                </View>
                            )}

                            <View style={styles.infoWrapper}>
                                <View style={styles.nameRow}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <View style={styles.statusBadge}>
                                        <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
                                    </View>
                                </View>

                                <Text style={styles.info}>
                                    {item.especie} • {item.age} • {item.gender}
                                </Text>

                                <Text style={styles.subInfo}>
                                    Size: {item.size} | Color: {item.color}
                                </Text>

                                <TouchableOpacity
                                    style={[styles.btnView, isAdmin && { flex: 1, marginRight: 8 }]}
                                    onPress={() => navigation.navigate("Request", { pet: item })}
                                >
                                    <Text style={styles.btnText}>VIEW / ADOPT</Text>
                                </TouchableOpacity>

                                {isAdmin && (
                                    <TouchableOpacity
                                        style={styles.btnDelete}
                                        onPress={() => eliminarMascota(item.id)}
                                    >
                                        <Text style={styles.btnText}>DELETE</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )}
                />
            )}

            {/* Barra de Navegación Inferior */}
            <View style={styles.navBar}>
                {!isAdmin && (
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Requests")}>
                        <Text style={styles.navText}>My Requests</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("Profile")}>
                        <Text style={styles.footerBtnText}>Profile</Text>
                    </TouchableOpacity>
                    {!isAdmin && (
                        <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("Requests")}>
                            <Text style={styles.footerBtnText}>Request</Text>
                        </TouchableOpacity>
                    )}

                    {isAdmin && (
                        <TouchableOpacity
                            style={styles.footerBtn}
                            onPress={() => navigation.navigate("Admin")}
                        >
                            <Text style={styles.footerBtnText}>Admin Panel</Text>
                        </TouchableOpacity>
                    )}

                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 25,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderColor: '#D9D9D9',
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        fontFamily: 'Poppins-Medium',
        marginTop: 10,
        fontSize: 14,
        color: '#6FCF97',
    },
    brand: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: '#6FCF97',
        letterSpacing: 4,
        textTransform: 'uppercase'
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 22,
        color: '#000',
        marginTop: 2
    },
    listContent: {
        padding: 20,
        paddingBottom: 100
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    petImage: {
        width: '100%',
        height: 180,
    },
    placeholderImagen: {
        width: '100%',
        height: 180,
        backgroundColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontFamily: 'Poppins-Regular',
        color: '#666'
    },
    infoWrapper: {
        padding: 16,
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        color: '#000',
    },
    statusBadge: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    statusText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 10,
        color: '#6FCF97'
    },
    info: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#333',
        marginTop: 2,
    },
    subInfo: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#555',
        marginBottom: 15
    },
    btnView: {
        width: '100%',
        height: 45,
        backgroundColor: '#6FCF97',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#000'
    },
    btnDelete: {
        marginTop: 5,
        width: '100%',
        height: 45,
        backgroundColor: '#AF4A3D',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#000'
    },
    btnText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: '#FFFFFF',
    },
    navBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: Platform.OS === 'ios' ? 30 : 15,
        borderTopWidth: 1,
        borderColor: '#D9D9D9',
        backgroundColor: '#FFFFFF'
    },
    navItem: {
        paddingVertical: 5,
    },
    navText: {
        fontFamily: 'Poppins-SemiBold',
        color: '#000',
        fontSize: 13,
        textDecorationLine: 'none'
    },
    adminBadge: {
        backgroundColor: '#000',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    navTextAdmin: {
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    emptyText: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        marginTop: 50,
        color: '#999',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: '#000',
        backgroundColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    footerBtn: {
        marginHorizontal: 20,
        backgroundColor: '#76D7A4',
        borderWidth: 1,
        borderColor: '#000',
        paddingVertical: 10,
        borderRadius: 0,
        width: '48%',
        alignItems: 'center',
        borderRadius: 25,
    },
    footerBtnText: {
        fontSize: 14,
        color: '#000'
    }
});

export default PantallaPets;