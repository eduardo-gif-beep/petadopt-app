import { Button, Text, TextInput, View } from "react-native";
import { useAdoptionRequest } from "../viewmodels/useAdoptionRequest";

const PantallaAdoptionRequest = ({ route, navigation }) => {

    const { pet } = route.params;

    const {
        motivo,
        setMotivo,
        enviarSolicitud
    } = useAdoptionRequest();

    return (
        <View style={{ padding:20 }}>
            <Text>Adoptar a: {pet.name}</Text>

            <TextInput
                placeholder="Motivo"
                value={motivo}
                onChangeText={setMotivo}
                style={{ borderWidth:1, marginVertical:10 }}
            />

            <Button 
                title="Enviar solicitud" 
                onPress={() => enviarSolicitud(pet, navigation)} 
            />

            <Button 
                title="Cancelar"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};

export default PantallaAdoptionRequest;