import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRecentRequests } from '../viewmodels/useRequests';

const RecentRequestsScreen = ({ navigation }) => {
    const { requests, loading, refreshing, onRefresh, formatDate } = useRecentRequests();

    const getStatusStyle = (status) => {
        const currentStatus = status ? status.toLowerCase().trim() : '';
        switch (currentStatus) {
            case 'aprobado':
                return styles.statusApproved;
            case 'rechazado':
                return styles.statusRejected;
            case 'pendiente':
                return styles.statusPending;
            default:
                return styles.statusPending;
        }
    };

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} color="#2ecc71" />;

    return (
        <View style={styles.mainContainer}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <View style={styles.placeholderLogo}>
                        <Text style={{ fontSize: 10 }}>Logo</Text>
                    </View>
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>PetAdopt</Text>
                    <Text style={styles.headerSubtitle}>Recent Request</Text>
                </View>
            </View>
            <View style={styles.divider} />

            {requests.length === 0 ? (
                <Text style={styles.emptyText}>No has enviado solicitudes aún. 🐾</Text>
            ) : (
                <FlatList
                    data={requests}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <View>
                                    <Text style={styles.petNameLabel}>Pet Name: {item.petId?.name || 'Mascota'}</Text>
                                    <Text style={styles.dateLabel}>Date: {formatDate(item.createdAt) || '00/00/0000'}</Text>
                                </View>
                                <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                                    <Text style={styles.statusText}>
                                        {item.status === 'pendiente' ? 'Pending' : item.status === 'rechazado' ? 'Rejected' : 'Approved'}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.cardDivider} />

                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailText}>Name: {item.petId?.name}</Text>
                                <Text style={styles.detailText}>Age: {item.petId?.age || 'N/A'}</Text>
                                <Text style={styles.detailText}>Color: {item.petId?.color || 'N/A'}</Text>
                                <Text style={styles.detailText} numberOfLines={2}>
                                    {item.motive || 'No description provided.'}
                                </Text>
                            </View>

                            <TouchableOpacity style={styles.cancelBtn}>
                                <Text style={styles.cancelBtnText}>Cancel Request</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            {/* Footer Navigation */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerBtnActive}>
                    <Text style={styles.footerBtnText}>Recent Requests</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerBtnProfile} onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.footerBtnText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 20,
        marginBottom: 10
    },
    logoContainer: {
        width: 50,
        height: 35,
    },
    placeholderLogo: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
        marginRight: 50
    },
    headerTitle: {
        fontSize: 14,
        color: '#000'
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#000'
    },
    divider: {
        height: 1,
        backgroundColor: '#000',
        marginHorizontal: 20,
        marginBottom: 10
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100
    },
    card: {
        backgroundColor: '#D9D9D9',
        borderRadius: 40,
        padding: 20,
        marginBottom: 20,
        borderWidth: 0.5,
        borderColor: '#999'
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    petNameLabel: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000'
    },
    dateLabel: {
        fontSize: 12,
        color: '#333'
    },
    cardDivider: {
        height: 1,
        backgroundColor: '#000',
        marginVertical: 5
    },
    statusBadge: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#000'
    },
    statusPending: { backgroundColor: '#FFF59D' }, // Amarillo
    statusRejected: { backgroundColor: '#CC5544' }, // Rojo oscuro
    statusApproved: { backgroundColor: '#76D7A4' }, // Verde
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#000'
    },
    detailsContainer: {
        marginTop: 5
    },
    detailText: {
        fontSize: 13,
        color: '#000',
        marginBottom: 2
    },
    cancelBtn: {
        backgroundColor: '#D97B7B',
        alignSelf: 'flex-end',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 10
    },
    cancelBtnText: {
        fontSize: 12,
        color: '#000'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: '#000',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFF'
    },
    footerBtnActive: {
        backgroundColor: '#76D7A4',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#000',
        width: '45%',
        alignItems: 'center'
    },
    footerBtnProfile: {
        backgroundColor: '#76D7A4',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#000',
        width: '45%',
        alignItems: 'center'
    },
    footerBtnText: {
        color: '#000',
        fontSize: 14,
        textAlign: 'center'
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#666'
    }
});

export default RecentRequestsScreen;