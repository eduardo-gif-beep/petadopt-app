import React from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAdminRequests } from '../viewmodels/useAdminPets';

const AdminDashboardScreen = ({ navigation }) => {
    const { requests, loading, handleStatusUpdate } = useAdminRequests();

    if (loading) return <ActivityIndicator size="large" color="#6FCF97" style={{ flex: 1 }} />;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Admin Panel</Text>
                <Text style={styles.subTitle}>Adoption Requests</Text>
            </View>

            <FlatList
                data={requests}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.requestCard}>
                        <View style={styles.infoRow}>
                            <Text style={styles.userText}>{item.userId?.name || 'Unknown User'}</Text>
                            <Text style={styles.petText}>🐾 {item.petId?.name}</Text>
                        </View>
                        
                        <View style={styles.detailsRow}>
                            <View style={styles.detailPill}>
                                <Text style={styles.detailText}>💰 ${item.income}</Text>
                            </View>
                            <View style={styles.detailPill}>
                                <Text style={styles.detailText}>🏡 Yard: {item.haveyard ? 'YES' : 'NO'}</Text>
                            </View>
                        </View>

                        <Text style={styles.motiveLabel}>Motive:</Text>
                        <Text style={styles.motiveText} numberOfLines={2}>{item.motive}</Text>

                        <View style={styles.divider} />

                        {item.status === 'pendiente' ? (
                            <View style={styles.actionRow}>
                                <TouchableOpacity
                                    style={[styles.btn, styles.btnApprove]}
                                    onPress={() => handleStatusUpdate(item._id, 'aprobado')}
                                >
                                    <Text style={styles.btnText}>Approve</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.btn, styles.btnReject]}
                                    onPress={() => handleStatusUpdate(item._id, 'rechazado')}
                                >
                                    <Text style={styles.btnText}>Reject</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.statusFooter}>
                                <Text style={[
                                    styles.completedText, 
                                    { color: item.status === 'aprobado' ? '#6FCF97' : '#AF4A3D' }
                                ]}>
                                    Result: {item.status.toUpperCase()}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            />

            {/* Navbar inferior estilizada */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate("RegisterPet")}>
                    <Text style={styles.navText}>➕ New Pet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate("Pets")}>
                    <Text style={styles.navText}>🏠 Home</Text>
                </TouchableOpacity>
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
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#D9D9D9',
        alignItems: 'center'
    },
    title: { 
        fontFamily: 'Poppins-Bold',
        fontSize: 22, 
        color: '#000000',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    subTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#6FCF97',
        marginTop: -5
    },
    listContent: {
        padding: 20,
        paddingBottom: 100
    },
    requestCard: { 
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        padding: 18,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    infoRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 12
    },
    userText: { 
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16, 
        color: '#000000',
    },
    petText: { 
        fontFamily: 'Poppins-Medium',
        fontSize: 14, 
        color: '#333' 
    },
    detailsRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12
    },
    detailPill: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 15,
    },
    detailText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: '#000',
    },
    motiveLabel: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#000',
        marginBottom: 2
    },
    motiveText: { 
        fontFamily: 'Poppins-Regular',
        fontSize: 12, 
        color: '#444', 
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginVertical: 10
    },
    actionRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        gap: 10 
    },
    btn: { 
        flex: 1,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#000'
    },
    btnApprove: { 
        backgroundColor: '#6FCF97',
    },
    btnReject: { 
        backgroundColor: '#AF4A3D',
    },
    btnText: { 
        fontFamily: 'Poppins-Bold',
        fontSize: 13, 
        color: '#FFFFFF',
        textTransform: 'uppercase',
    },
    statusFooter: {
        alignItems: 'center',
        paddingVertical: 5
    },
    completedText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        letterSpacing: 0.5
    },
    navBar: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#D9D9D9',
        paddingBottom: Platform.OS === 'ios' ? 30 : 15,
        paddingTop: 15,
        justifyContent: 'space-around'
    },
    navBtn: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000'
    },
    navText: {
        fontFamily: 'Poppins-SemiBold',
        color: '#000',
        fontSize: 12,
    }
});

export default AdminDashboardScreen;