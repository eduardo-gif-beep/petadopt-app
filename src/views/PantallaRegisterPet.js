import React from 'react';
import { 
    ActivityIndicator, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    Image, 
    Platform, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    Keyboard 
} from 'react-native';
import { useAdminPet } from '../viewmodels/useRegisterPet';

const AdminRegisterPetScreen = ({ navigation }) => {
    const { form, setForm, loading, handleSave } = useAdminPet(navigation);

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: '#FFFFFF' }}
        >
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.btnBack} 
                    onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Pets")}
                >
                    <Text style={styles.textoBack}>← Back</Text>
                </TouchableOpacity>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>PetAdopt</Text>
                    <Text style={styles.headerSubtitle}>Pet Form</Text>
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
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Form Fields */}
                    <Text style={styles.label}>NAME</Text>
                    <TextInput
                        style={styles.input}
                        value={form.name}
                        onChangeText={(v) => setForm({ ...form, name: v })}
                        placeholder="Pet name"
                    />

                    <Text style={styles.label}>RACE / BREED</Text>
                    <TextInput
                        style={styles.input}
                        value={form.dogbreed}
                        onChangeText={(v) => setForm({ ...form, dogbreed: v })}
                        placeholder="Golden Retriever, Husky..."
                    />

                    <Text style={styles.label}>AGE</Text>
                    <TextInput
                        style={styles.input}
                        value={form.age}
                        keyboardType="numeric"
                        onChangeText={(v) => setForm({ ...form, age: v })}
                        placeholder="e.g. 2 years"
                    />

                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 20 }}>
                            <Text style={styles.label}>SIZE</Text>
                            <TextInput
                                style={styles.input}
                                value={form.size}
                                onChangeText={(v) => setForm({ ...form, size: v })}
                                placeholder="Small, Medium..."
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.label}>SEX</Text>
                            <TextInput
                                style={styles.input}
                                value={form.gender}
                                onChangeText={(v) => setForm({ ...form, gender: v })}
                                placeholder="M / F"
                            />
                        </View>
                    </View>

                    <Text style={styles.label}>DESCRIPTION</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        multiline
                        value={form.description}
                        onChangeText={(v) => setForm({ ...form, description: v })}
                        placeholder="Tell us about the pet's personality..."
                    />

                    <Text style={styles.label}>PHOTO URL</Text>
                    <TextInput
                        style={styles.input}
                        value={form.imageUrl}
                        onChangeText={(v) => setForm({ ...form, imageUrl: v })}
                        placeholder="https://image-link.com/photo.jpg"
                        autoCapitalize="none"
                    />

                    {/* Submit Button */}
                    <View style={styles.btnContainer}>
                        <TouchableOpacity 
                            style={[styles.btnSave, { opacity: loading ? 0.7 : 1 }]} 
                            onPress={handleSave} 
                            disabled={loading}
                        >
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Add Pet</Text>}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>

            {/* Footer Navigation */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("Pets")}>
                    <Text style={styles.footerBtnText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate("Profile")}>
                    <Text style={styles.footerBtnText}>Profile</Text>
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
        marginBottom: 10
    },
    container: {
        flex: 1,
        paddingHorizontal: 25,
    },
    label: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        marginTop: 15,
        marginBottom: 5,
        color: '#000',
        marginLeft: 5
    },
    input: {
        backgroundColor: '#F2F2F2',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 45,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#000',
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
        paddingTop: 12,
        borderRadius: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    btnSave: {
        backgroundColor: '#6FCF97',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#000',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
    btnText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
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
        borderRadius: 20,
        width: '40%',
        alignItems: 'center',
    },
    footerBtnText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#FFF'
    },
});

export default AdminRegisterPetScreen;