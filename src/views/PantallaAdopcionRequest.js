import React from 'react';
import { 
    Platform, 
    ActivityIndicator, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    Image, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    Keyboard 
} from 'react-native';
import { useAdoptionRequest } from '../viewmodels/useAdoptionRequest';

const AdoptionRequestScreen = ({ route, navigation }) => {
    const { pet } = route.params;
    const { motive, setMotive, user, loading, isSubmitting, handleSend } = useAdoptionRequest(pet, navigation);

    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} color="#2ecc71" />;

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: '#FFFFFF' }}
        >
            {/* Header Section - Fijo arriba */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.btnBack} 
                    onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Pets")}
                >
                    <Text style={styles.textoBack}>← Back</Text>
                </TouchableOpacity>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>PetAdopt</Text>
                    <Text style={styles.headerSubtitle}>Adoption Request</Text>
                </View>

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../images/logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <View style={styles.divider} />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView 
                    style={styles.container}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                >
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
            </TouchableWithoutFeedback>

            {/* Footer Navigation - Fijo abajo */}
            <View style={styles.footer}>
                {!user?.isAdmin && (
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("Requests")}>
                        <Text style={styles.footerBtnText}>Recent Requests</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("Pets")}>
                    <Text style={styles.footerBtnText}>Home</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: '#FFF'
    },
    btnBack: {
        backgroundColor: '#6FCF97',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    textoBack: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#000'
    },
    headerSubtitle: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#666'
    },
    logoContainer: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    divider: {
        height: 1,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 25,
        marginTop: 15
    },
    bubbleCard: {
        backgroundColor: '#D9D9D9',
        borderRadius: 30,
        padding: 20,
        borderWidth: 0.5,
        borderColor: '#999',
        marginBottom: 20
    },
    label: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        marginBottom: 5,
        marginTop: 10,
        color: '#000',
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 40,
        fontSize: 14,
        color: '#000',
        borderWidth: 1,
        borderColor: '#000',
    },
    disabled: {
        backgroundColor: '#F5F5F5',
        borderColor: '#CCC'
    },
    textArea: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 15,
        padding: 12,
        height: 100,
        textAlignVertical: 'top',
        fontFamily: 'Poppins-Regular'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnSend: {
        backgroundColor: '#6FCF97',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 25,
        borderWidth: 1,
        borderColor: '#000',
        alignSelf: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
    btnText: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#FFF',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: '#D9D9D9',
        backgroundColor: '#FFF',
    },
    footerBtn: {
        backgroundColor: '#6FCF97',
        borderWidth: 1,
        borderColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        width: '42%',
        alignItems: 'center',
    },
    footerBtnText: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        color: '#FFF'
    }
});

export default AdoptionRequestScreen;