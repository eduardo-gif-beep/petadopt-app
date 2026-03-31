import { FlatList, Text, View, Button } from "react-native";
import { useRequests } from "../viewmodels/useRequests";

const PantallaRequests = ({ navigation }) => {

    const { requests } = useRequests();

    return (
        <View style={{ padding:20 }}>
            <Text style={{ fontSize:20, marginBottom:10 }}>
                Mis solicitudes
            </Text>

            <FlatList
                data={requests}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={{ marginBottom:5 }}>
                        {item.pet} - {item.status}
                    </Text>
                )}
            />
            <Button 
                title="Volver"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};

export default PantallaRequests;