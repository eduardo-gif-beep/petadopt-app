import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useAdminPet } from '../viewmodels/useRegisterPet';

const AdminRegisterPetScreen = ({ navigation }) => {
    const { form, setForm, loading, handleSave } = useAdminPet(navigation);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Register New Pet</Text>

                <Text style={styles.label}>Nombre:</Text>
                <TextInput style={styles.input} value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />

                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={styles.label}>Raza:</Text>
                        <TextInput style={styles.input} value={form.dogbreed} onChangeText={(v) => setForm({ ...form, dogbreed: v })} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Color:</Text>
                        <TextInput style={styles.input} value={form.color} onChangeText={(v) => setForm({ ...form, color: v })} />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={styles.label}>Tamaño:</Text>
                        <TextInput style={styles.input} value={form.size} placeholder="Grande/Mediano" onChangeText={(v) => setForm({ ...form, size: v })} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Estado Salud:</Text>
                        <TextInput style={styles.input} value={form.healtStatus} onChangeText={(v) => setForm({ ...form, healtStatus: v })} />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Text style={styles.label}>Age (e.g. 2 years):</Text>
                        <TextInput style={styles.input} value={form.age} onChangeText={(v) => setForm({ ...form, age: v })} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Gender:</Text>
                        <TextInput style={styles.input} value={form.gender} onChangeText={(v) => setForm({ ...form, gender: v })} />
                    </View>
                </View>

                <Text style={styles.label}>Image URL:</Text>
                <TextInput style={styles.input} value={form.imageUrl} placeholder="https://..." onChangeText={(v) => setForm({ ...form, imageUrl: v })} />

                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    multiline
                    value={form.description}
                    onChangeText={(v) => setForm({ ...form, description: v })}
                />

                <TouchableOpacity style={styles.btnSave} onPress={handleSave} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Save Pet</Text>}
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
    card: { 
        backgroundColor: '#FFFFFF', 
        paddingVertical: 20, 
        marginTop: 10 
    },
    title: { 
        fontSize: 18, 
        fontWeight: '700', 
        marginBottom: 25, 
        textAlign: 'left',
        color: '#000',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    label: { 
        fontSize: 11,
        fontWeight: '700', 
        marginTop: 15, 
        marginBottom: 5,
        color: '#666',
        textTransform: 'uppercase'
    },
    input: { 
        borderWidth: 1, 
        borderColor: '#000', 
        borderRadius: 2, 
        padding: 10,
        fontSize: 14,
        backgroundColor: '#FFF'
    },
    row: { 
        flexDirection: 'row',
        marginTop: 5
    },
    btnSave: { 
        backgroundColor: '#000', 
        padding: 15, 
        borderRadius: 2, 
        alignItems: 'center', 
        marginTop: 35,
        borderWidth: 1,
        borderColor: '#000'
    },
    btnText: { 
        color: '#FFF',
        fontWeight: '700', 
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 1
    }
});

export default AdminRegisterPetScreen;