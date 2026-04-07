import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useAdminPet } from '../viewmodels/useRegisterPet';

const AdminRegisterPetScreen = ({ navigation }) => {
    const { form, setForm, loading, handleSave } = useAdminPet(navigation);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ScrollView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../images/logo.png')} // Ajusta la ruta según tu estructura de carpetas
                            style={styles.logoImage}
                            resizeMode="contain" // Esto evita que el logo se deforme o se corte
                        />
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>PetAdopt</Text>
                        <Text style={styles.headerSubtitle}>Pet form</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Form Fields */}
                <Text style={styles.label}>NAME</Text>
                <TextInput
                    style={styles.input}
                    value={form.name}
                    onChangeText={(v) => setForm({ ...form, name: v })}
                />

                <Text style={styles.label}>Race</Text>
                <TextInput
                    style={styles.input}
                    value={form.dogbreed}
                    onChangeText={(v) => setForm({ ...form, dogbreed: v })}
                />

                <Text style={styles.label}>Age</Text>
                <TextInput
                    style={styles.input}
                    value={form.age}
                    onChangeText={(v) => setForm({ ...form, age: v })}
                />

                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 20 }}>
                        <Text style={styles.label}>Size</Text>
                        <TextInput
                            style={styles.inputSmall}
                            value={form.size}
                            onChangeText={(v) => setForm({ ...form, size: v })}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Sex</Text>
                        <TextInput
                            style={styles.inputSmall}
                            value={form.gender}
                            onChangeText={(v) => setForm({ ...form, gender: v })}
                        />
                    </View>
                </View>

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, { height: 70, borderRadius: 35 }]}
                    multiline
                    value={form.description}
                    onChangeText={(v) => setForm({ ...form, description: v })}
                />

                <Text style={styles.label}>Load Photo</Text>
                <TextInput
                    style={[styles.input, { width: '60%' }]}
                    value={form.imageUrl}
                    onChangeText={(v) => setForm({ ...form, imageUrl: v })}
                    placeholder="https://..."
                />

                {/* Submit Button */}
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnSave} onPress={handleSave} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Add pet</Text>}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Footer Navigation */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerBtnBack} onPress={() => navigation.goBack()}>
                    <Text style={styles.footerBtnText}>← Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerBtnProfile}>
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
        paddingHorizontal: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    logoContainer: {
    width: 50,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
},
logoImage: {
    width: '100%',
    height: '100%',
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
        marginRight: 60
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000'
    },
    headerSubtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000'
    },
    divider: {
        height: 1,
        backgroundColor: '#000',
        marginBottom: 20
    },
    label: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 5,
        color: '#000',
        marginLeft: 10
    },
    input: {
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 14,
        marginBottom: 5,
        minHeight: 40
    },
    inputSmall: {
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 14,
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    btnSave: {
        backgroundColor: '#5C6BC0',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#000'
    },
    btnText: {
        color: '#FFF',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: '#eee'
    },
    footerBtnBack: {
        backgroundColor: '#76D7A4',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: '#000',
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerBtnProfile: {
        backgroundColor: '#76D7A4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#000'
    },
    footerBtnText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '400'
    }
});

export default AdminRegisterPetScreen;