import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useAdoptionRequest } from '../viewmodels/useAdoptionRequest';

const AdoptionRequestScreen = ({ route, navigation }) => {
    const { pet } = route.params;
    const { motive, setMotive, user, loading, isSubmitting, handleSend } = useAdoptionRequest(pet, navigation);

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} color="#2ecc71" />;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerBox}>
                <Text style={styles.headerTitle}>PetAdopt</Text>
                <Text style={styles.headerSub}>Adoption Request</Text>
            </View>

            <View style={styles.formCard}>
                <Text style={styles.label}>Your Name:</Text>
                <TextInput style={[styles.input, styles.disabled]} value={`${user?.name} ${user?.lastName}`} editable={false} />

                <View style={styles.row}>
                    <View style={{ flex: 1.5, marginRight: 10 }}>
                        <Text style={styles.label}>Pet Name:</Text>
                        <TextInput style={[styles.input, styles.disabled]} value={pet.name} editable={false} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Pet Age:</Text>
                        <TextInput style={[styles.input, styles.disabled]} value={pet.age ? String(pet.age) : "N/A"} editable={false} />
                    </View>
                </View>

                <Text style={styles.labelCenter}>Why do you want to adopt?</Text>
                <TextInput
                    style={styles.textArea}
                    multiline
                    placeholder={user?.isAdmin ? "Admins cannot send requests" : "Tell us about your home..."}
                    value={motive}
                    onChangeText={setMotive}
                    editable={!user?.isAdmin}
                />

                <Text style={styles.label}>Do you have a yard/garden/space?</Text>
                <View style={styles.pickerFake}>
                    <Text>{user?.haveyard ? "Yes, I have space" : "No yard available"}</Text>
                </View>

                <Text style={styles.label}>Monthly income:</Text>
                <View style={styles.pickerFake}>
                    <Text>${user?.income}</Text>
                </View>
                {!user?.isAdmin && (
                    <TouchableOpacity style={styles.btnSend} onPress={handleSend} disabled={isSubmitting}>
                        {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Send Request</Text>}
                    </TouchableOpacity>
                )}

            </View>

            <View style={styles.footer}>
                {!user?.isAdmin && (
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("Requests")}>
                    <Text>📋 Recent Requests</Text>
                </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("Profile")}>
                    <Text>👤 Profile</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFFFFF', 
        paddingHorizontal: 20 
    },
    headerBox: { 
        paddingVertical: 30, 
        borderBottomWidth: 1, 
        borderColor: '#000', 
        marginBottom: 20,
        alignItems: 'flex-start' 
    },
    headerTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        letterSpacing: 1 
    },
    headerSub: { 
        fontSize: 12, 
        color: '#666', 
        textTransform: 'uppercase' 
    },
    formCard: { 
        backgroundColor: '#FFF' 
    },
    label: { 
        fontSize: 12,
        fontWeight: '700', 
        marginBottom: 5, 
        marginTop: 15,
        textTransform: 'uppercase',
        color: '#000'
    },
    labelCenter: { 
        fontSize: 12,
        fontWeight: '700', 
        marginTop: 20,
        marginBottom: 10,
        textTransform: 'uppercase'
    },
    input: { 
        borderWidth: 1, 
        borderColor: '#000', 
        borderRadius: 2, 
        padding: 10, 
        fontSize: 14,
        color: '#000'
    },
    disabled: { 
        backgroundColor: '#F3F4F6', 
        borderColor: '#D1D5DB',
        color: '#9CA3AF' 
    },
    textArea: { 
        borderWidth: 1, 
        borderColor: '#000', 
        borderRadius: 2, 
        padding: 12, 
        height: 100, 
        textAlignVertical: 'top' 
    },
    pickerFake: { 
        borderWidth: 1, 
        borderColor: '#D1D5DB', 
        padding: 12, 
        borderRadius: 2, 
        backgroundColor: '#F9FAFB'
    },
    btnSend: { 
        backgroundColor: '#000', 
        padding: 15, 
        borderRadius: 2, 
        alignItems: 'center', 
        marginTop: 25 
    },
    btnText: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        color: '#FFF',
        textTransform: 'uppercase'
    },
    footer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 30, 
        marginBottom: 40,
        borderTopWidth: 1,
        borderColor: '#EEE',
        paddingTop: 20
    },
    footerBtn: { 
        borderWidth: 1, 
        borderColor: '#000', 
        padding: 10, 
        borderRadius: 2, 
        width: '48%', 
        alignItems: 'center' 
    },
    row: { 
        flexDirection: 'row' 
    }
});

export default AdoptionRequestScreen;