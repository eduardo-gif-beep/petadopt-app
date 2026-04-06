import React from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { useRecentRequests } from '../viewmodels/useRequests';

const RecentRequestsScreen = () => {
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
        <View style={styles.container}>
            <Text style={styles.title}>My Requests</Text>
            
            {requests.length === 0 ? (
                <Text style={styles.emptyText}>No has enviado solicitudes aún. 🐾</Text>
            ) : (
                <FlatList
                    data={requests}
                    keyExtractor={(item) => item._id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.petName}>{item.petId?.name || 'Mascota'}</Text>
                                <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                                    <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
                                </View>
                            </View>
                            
                            
                            <Text style={styles.date}>Estado: Actualizado recientemente </Text>
                            
                            <Text style={styles.motive} numberOfLines={2}>Motivo: {item.motive}</Text>
                            
                            {item.observaciones && (
                                <Text style={styles.obs}>Notas: {item.observaciones}</Text>
                            )}
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFFFFF', 
        paddingHorizontal: 20, 
        paddingTop: 40 
    },
    title: { 
        fontSize: 20, 
        fontWeight: '700', 
        marginBottom: 25, 
        textAlign: 'left', 
        color: '#000',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    card: { 
        backgroundColor: '#FFF', 
        padding: 16, 
        marginBottom: 12, 
        borderWidth: 1, 
        borderColor: '#000',
        borderRadius: 2 
    },
    cardHeader: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: 12 
    },
    petName: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#000',
        textTransform: 'uppercase'
    },
    statusBadge: { 
        paddingHorizontal: 8, 
        paddingVertical: 2, 
        borderWidth: 1,
        borderRadius: 2
    },
    statusText: { 
        fontSize: 10, 
        fontWeight: '700' 
    },
    statusApproved: { 
        backgroundColor: '#969696',
        borderColor: '#8f8f8f' 
    },
    statusRejected: { 
        backgroundColor: 'transparent', 
        borderColor: '#D1D5DB'
    },
    statusPending: { 
        backgroundColor: '#F3F4F6', 
        borderColor: '#838383',
        borderStyle: 'dashed'
    },
    statusTextApproved: { color: '#FFF' },
    statusTextNeutral: { color: '#898989' },

    date: { 
        fontSize: 11, 
        color: '#888',
        marginBottom: 4 
    },
    motive: { 
        fontSize: 13, 
        color: '#333', 
        lineHeight: 18 
    },
    obs: { 
        fontSize: 12, 
        color: '#666', 
        marginTop: 10, 
        paddingTop: 10,
        borderTopWidth: 1, 
        borderTopColor: '#EEE',
        fontStyle: 'italic'
    },
    emptyText: { 
        textAlign: 'center', 
        marginTop: 60, 
        color: '#AAA', 
        fontSize: 14,
        textTransform: 'uppercase'
    }
});

export default RecentRequestsScreen;