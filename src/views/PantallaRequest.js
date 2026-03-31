import { FlatList, Text, View } from "react-native";

const mockRequests = [
    { id: "1", pet: "Rex", status: "pendiente" },
    { id: "2", pet: "Michi", status: "aprobado" }
];

const PantallaRequests = () => {

    return (
        <View style={{ padding:20 }}>
            <Text>Mis solicitudes</Text>

            <FlatList
                data={mockRequests}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text>{item.pet} - {item.status}</Text>
                )}
            />
        </View>
    );
};

export default PantallaRequests;