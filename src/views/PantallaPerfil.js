import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../viewmodels/useProfile';

const ProfileScreen = ({ navigation }) => {
    const { user, loading, handleLogout } = useProfile(navigation);

    if (loading) return <ActivityIndicator size="large" color="#77ddaa" style={{flex:1}} />;

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <View style={styles.headerTitleBox}>
                        <Text style={styles.headerPetAdopt}>PetAdopt</Text>
                        <Text style={styles.headerProfile}>Profile</Text>
                    </View>
                </View>

                <View style={styles.avatarContainer}>
                    <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={70} color="#ccc" />
                    </View>
                </View>

                <View>
                    <Text>Full Name: {user?.name} {user?.lastName}</Text>
                    
                    <Text>E-mail: {user?.email} </Text>
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
                    
                    <TouchableOpacity onPress={handleLogout}>
                        <Text>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FFFFFF',
        minHeight: '100%'
    },
    headerTitleBox: {
        marginTop: 20,
        marginBottom: 40,
        borderLeftWidth: 4,
        borderColor: '#000',
        paddingLeft: 15
    },
    headerPetAdopt: {
        fontSize: 14,
        fontWeight: '400',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    headerProfile: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000'
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 40
    },
    avatarCircle: {
        width: 120,
        height: 120,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#EEE',
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#AAA',
        textTransform: 'uppercase',
        marginBottom: 2
    },
    infoValue: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#F3F4F6',
        paddingBottom: 5
    },
    navBar: {
        marginTop: 40,
        paddingTop: 20,
        borderTopWidth: 1,
        borderColor: '#000',
        flexDirection: 'column',
        gap: 12
    },
    btnNav: {
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        borderRadius: 2
    },
    btnLogout: {
        paddingVertical: 12,
        alignItems: 'center'
    },
    btnText: {
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: '#000'
    },
    logoutText: {
        fontSize: 13,
        color: '#888',
        textDecorationLine: 'underline'
    }
});

export default ProfileScreen;