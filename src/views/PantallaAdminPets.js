import { Button, FlatList, Text, View } from "react-native";
import { useAdminPets } from "../viewmodels/useAdminPets";

const PantallaAdminPets = ({ navigation }) => {

    const { pets, deletePet } = useAdminPets();

    return (
        <View style={{ padding:20 }}>
            <Text style={{ fontSize:20, marginBottom:10 }}>
                Administrar Mascotas
            </Text>

            <FlatList
                data={pets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom:10 }}>
                        <Text>{item.name}</Text>

                        <Button 
                            title="Eliminar" 
                            onPress={() => deletePet(item.id)} 
                        />
                    </View>
                )}
            />

            <Button 
                title="Volver"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};

export default PantallaAdminPets;