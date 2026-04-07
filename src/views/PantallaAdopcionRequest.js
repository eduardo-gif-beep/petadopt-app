import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAdoptionRequest } from '../viewmodels/useAdoptionRequest';

const AdoptionRequestScreen = ({ route, navigation }) => {
    const { pet } = route.params;
    const { motive, setMotive, user, loading, isSubmitting, handleSend } = useAdoptionRequest(pet, navigation);

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} color="#2ecc71" />;

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ScrollView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <View style={styles.placeholderLogo}>
                            <Text style={{ fontSize: 10 }}>Logo</Text>
                        </View>
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>PetAdopt</Text>
                        <Text style={styles.headerSubtitle}>Adoption Request</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Form Card (Bubble Style) */}
                <View style={styles.bubbleCard}>
                    <Text style={styles.label}>Your Name:</Text>
                    <TextInput 
                        style={[styles.input, styles.disabled]} 
                        value={`${user?.name} ${user?.lastName}`} 
                        editable={false} 
                    />

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

                    <Text style={styles.label}>Why do you want to adopt?</Text>
                    <TextInput
                        style={styles.textArea}
                        multiline
                        placeholder={user?.isAdmin ? "Admins cannot send requests" : "Tell us about your home..."}
                        value={motive}
                        onChangeText={setMotive}
                        editable={!user?.isAdmin}
                    />

                    <Text style={styles.label}>Do you have space?</Text>
                    <View style={[styles.input, styles.disabled, { justifyContent: 'center' }]}>
                        <Text style={{ color: '#000' }}>{user?.haveyard ? "Yes, I have space" : "No yard available"}</Text>
                    </View>

                    <Text style={styles.label}>Monthly income:</Text>
                    <View style={[styles.input, styles.disabled, { justifyContent: 'center' }]}>
                        <Text style={{ color: '#000' }}>${user?.income}</Text>
                    </View>

                    {!user?.isAdmin && (
                        <TouchableOpacity style={styles.btnSend} onPress={handleSend} disabled={isSubmitting}>
                            {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Send Request</Text>}
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>

            {/* Footer Navigation */}
            <View style={styles.footer}>
                {!user?.isAdmin && (
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("Requests")}>
                        <Text style={styles.footerBtnText}>Recent Requests</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("Profile")}>
                    <Text style={styles.footerBtnText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFFFFF', 
        paddingHorizontal: 25 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
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
        fontSize: 16,
        fontWeight: '400',
        color: '#000'
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#000'
    },
    divider: {
        height: 1,
        backgroundColor: '#000',
        marginBottom: 20
    },
    bubbleCard: {
        backgroundColor: '#D9D9D9',
        borderRadius: 40,
        padding: 25,
        marginBottom: 100, // Espacio para no chocar con el footer
        borderWidth: 0.5,
        borderColor: '#999'
    },
    label: { 
        fontSize: 13,
        fontWeight: '500', 
        marginBottom: 5, 
        marginTop: 10,
        color: '#000',
        marginLeft: 5
    },
    input: { 
        backgroundColor: '#FFF', 
        borderRadius: 20, 
        paddingHorizontal: 15, 
        paddingVertical: 8, 
        fontSize: 14,
        color: '#000',
        borderWidth: 1,
        borderColor: '#000',
        minHeight: 40
    },
    disabled: { 
        backgroundColor: '#F0F0F0', 
    },
    textArea: { 
        backgroundColor: '#FFF',
        borderWidth: 1, 
        borderColor: '#000', 
        borderRadius: 20, 
        padding: 15, 
        height: 80, 
        textAlignVertical: 'top' 
    },
    row: { 
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnSend: { 
        backgroundColor: '#76D7A4', // Color verde del botón de la imagen
        padding: 12, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginTop: 25,
        borderWidth: 1,
        borderColor: '#000',
        alignSelf: 'center',
        paddingHorizontal: 30
    },
    btnText: { 
        fontSize: 15, 
        fontWeight: '400', 
        color: '#000',
    },
    footer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
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
        backgroundColor: '#76D7A4',
        borderWidth: 1, 
        borderColor: '#000', 
        paddingVertical: 10, 
        borderRadius: 0, 
        width: '48%', 
        alignItems: 'center' 
    },
    footerBtnText: {
        fontSize: 14,
        color: '#000'
    }
});

export default AdoptionRequestScreen;