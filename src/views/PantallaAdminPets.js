import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAdminRequests } from '../viewmodels/useAdminPets';

const AdminDashboardScreen = ({ navigation }) => {
    const { requests, loading, handleStatusUpdate } = useAdminRequests();

    if (loading) return <ActivityIndicator size="large" color="#000" style={{ flex: 1 }} />;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Panel: Adoptions</Text>

            <FlatList
                data={requests}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.requestCard}>
                        <View style={styles.infoRow}>
                            <Text style={styles.userText}>User: {item.userId?.name || 'Unknown'}</Text>
                            <Text style={styles.petText}>Pet: {item.petId?.name}</Text>
                        </View>
                        <View style={styles.detailsRow}>
                            <Text style={styles.detailText}> income: ${item.income}</Text>
                            <Text style={styles.detailText}> yard: {item.haveyard ? 'YES' : 'NO'}</Text>
                            <Text style={[styles.statusBadge, { color: item.status === 'pendiente' ? '#888' : '#000' }]}>
                                Status: {item.status.toUpperCase()}
                            </Text>
                        </View>

                        <Text style={styles.motiveText}>Motive: {item.motive}</Text>

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
                                    <Text style={[styles.btnText, styles.btnTextSecondary]}>Reject</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Text style={styles.completedText}>Decision already registered</Text>
                        )}
                    </View>
                )}
            />

            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate("RegisterPet")}>
                    <Text style={styles.navText}>Register New Pet</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Pets")}>
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFF', 
        paddingHorizontal: 20, 
        paddingTop: 50 
    },
    title: { 
        fontSize: 18, 
        fontWeight: '400', 
        marginBottom: 30, 
        color: '#525151',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    requestCard: { 
        paddingVertical: 15, 
        borderBottomWidth: 1, 
        borderColor: '#EEE', 
        marginBottom: 10
    },
    infoRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 4 
    },
    detailsRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 8
    },
    detailText: {
        fontSize: 11,
        color: '#555',
        fontWeight: '500'
    },
    statusBadge: {
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 'auto'
    },
    userText: { 
        fontSize: 14, 
        color: '#696969',
        fontWeight: '600'
    },
    petText: { 
        fontSize: 14, 
        color: '#888' 
    },
    motiveText: { 
        fontSize: 12, 
        color: '#AAA', 
        marginBottom: 15,
        fontStyle: 'italic'
    },
    actionRow: { 
        flexDirection: 'row', 
        gap: 10 
    },
    btn: { 
        paddingVertical: 6, 
        paddingHorizontal: 12, 
        borderWidth: 1, 
        borderColor: '#979797', 
        borderRadius: 2 
    },
    btnApprove: { 
        backgroundColor: '#a9a9a9' 
    },
    btnReject: { 
        backgroundColor: '#FFF' 
    },
    btnText: { 
        fontSize: 11, 
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    btnTextSecondary: {
        color: '#000'
    },
    completedText: {
        fontSize: 10,
        color: '#BBB',
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#a5a5a5',
        marginTop: 10 
    },
    navText: {
        color: '#8b8b8b',
        fontSize: 12,
        fontWeight: 'bold'
    }
});

export default AdminDashboardScreen;