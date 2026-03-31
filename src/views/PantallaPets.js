import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { usePets } from "../viewmodels/usePets";

const PantallaPets = ({ navigation }) => {

    const { pets } = usePets();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecciona una mascota</Text>

            <FlatList
                data={pets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text>{item.name}</Text>
                        <Text>{item.especie}</Text>

                        <Button
                            title="Adoptar"
                            onPress={() => 
                                navigation.navigate("Request", { pet: item })
                            }
                        />
                    </View>
                )}
            />

            <Button 
                title="Ver mis solicitudes"
                onPress={() => navigation.navigate("Requests")}
            />

            <Button 
                title="Admin"
                onPress={() => navigation.navigate("Admin")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex:1, padding:20 },
    title: { fontSize:22, marginBottom:10 },
    card: { 
        padding:15, 
        backgroundColor:"#eee", 
        marginBottom:10,
        borderRadius:8
    }
});

export default PantallaPets;