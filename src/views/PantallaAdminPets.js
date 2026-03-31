import { Button, FlatList, Text, View } from "react-native";

const mockPets = [
    { id: "1", name: "Rex" },
    { id: "2", name: "Michi" }
];

const PantallaAdminPets = () => {

    return (
        <View style={{ padding:20 }}>
            <Text>Administrar Mascotas</Text>

            <FlatList
                data={mockPets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom:10 }}>
                        <Text>{item.name}</Text>
                        <Button title="Eliminar" onPress={() => alert("Eliminar")} />
                    </View>
                )}
            />
        </View>
    );
};

export default PantallaAdminPets;