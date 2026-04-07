import React from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAdminRequests } from '../viewmodels/useAdminPets';

const AdminDashboardScreen = ({ navigation }) => {
    const { requests, loading, handleStatusUpdate } = useAdminRequests();

    if (loading) return <ActivityIndicator size="large" color="#6FCF97" style={{ flex: 1 }} />;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Pets")}>
                    <Text style={styles.textoBack}>← Back</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Admin Panel</Text>
                    <Text style={styles.subTitle}>Adoption Requests</Text>
                </View>
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
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("RegisterPet")}>
                    <Text style={styles.footerBtnText}>New Pet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("Pets")}>
                    <Text style={styles.footerBtnText}>Home</Text>
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
        borderBottomWidth: 10,
        borderColor: '#D9D9D9',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', 
        minHeight: 120, 
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        color: '#000000',
        textTransform: 'uppercase',
        letterSpacing: 1,
        textAlign: 'center',
    },
    subTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#6FCF97',
        textAlign: 'center',
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
        width: '100%',
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
    },
    btnBack: {
        backgroundColor: '#6FCF97',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#000',
        position: 'absolute',
        left: 20,
        top: Platform.OS === 'ios' ? 70 : 50,
        zIndex: 10,
    },
    textoBack: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#ffffff',
    },
        textContainer: {
        alignItems: 'center',
        width: '100%',
    },
});

export default AdminDashboardScreen;