import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProfile } from '../viewmodels/useProfile';

const ProfileScreen = ({ navigation }) => {
    const { user, loading, handleLogout } = useProfile(navigation);

    if (loading) return <ActivityIndicator size="large" color="#6FCF97" style={{flex:1}} />;

    return (
        <View style={styles.pantalla}>
            {/* Header con el estilo de la app */}
            <View style={styles.header}>
                <Text style={styles.headerPetAdopt}>PetAdopt</Text>
                <Text style={styles.headerProfile}>My Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={70} color="#FFFFFF" />
                    </View>
                </View>

                {/* Información del usuario en estilo Píldora Gris */}
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Full Name</Text>
                    <View style={styles.infoPill}>
                        <Text style={styles.infoValue}>{user?.name} {user?.lastName}</Text>
                    </View>
                    
                    <Text style={styles.infoLabel}>E-mail Address</Text>
                    <View style={styles.infoPill}>
                        <Text style={styles.infoValue}>{user?.email}</Text>
                    </View>

                    <Text style={styles.infoLabel}>Account Type</Text>
                    <View style={styles.infoPill}>
                        <Text style={styles.infoValue}>{user?.isAdmin ? "Administrator" : "Adopter"}</Text>
                    </View>
                </View>

                {/* Botones Inferiores */}
                <View style={styles.navBar}>
                    {!user?.isAdmin && (
                        <TouchableOpacity 
                            style={styles.btnNav} 
                            onPress={() => navigation.navigate("Requests")}
                        >
                            <Text style={styles.btnText}>Recent Requests</Text>
                        </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 25,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#D9D9D9',
        alignItems: 'center'
    },
    headerPetAdopt: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: '#6FCF97', // Verde Primario
        textTransform: 'uppercase',
        letterSpacing: 2
    },
    headerProfile: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#000',
        marginTop: -5
    },
    container: {
        padding: 24,
        alignItems: 'center'
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30
    },
    avatarCircle: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: '#D9D9D9', // Gris oscuro de la paleta
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#6FCF97' // Borde verde
    },
    infoSection: {
        width: '100%',
        marginBottom: 20
    },
    infoLabel: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 13,
        color: '#000',
        marginLeft: 15,
        marginBottom: 5,
        marginTop: 15
    },
    infoPill: {
        width: '100%',
        height: 50,
        backgroundColor: '#D9D9D9', // Fondo gris de la paleta
        borderRadius: 25, // Estilo píldora
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    infoValue: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#333',
    },
    navBar: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
        gap: 15
    },
    btnNav: {
        width: '100%',
        height: 55,
        backgroundColor: '#6FCF97', // Verde Primario
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    btnText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#FFF',
        textTransform: 'uppercase'
    },
    btnLogout: {
        marginTop: 10,
        paddingVertical: 10
    },
    logoutText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        color: '#AF4A3D', // Rojo de tu paleta para acciones de salida
        textDecorationLine: 'underline'
    }
});

export default ProfileScreen;