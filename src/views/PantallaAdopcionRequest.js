import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const PantallaAdoptionRequest = ({ pet, goBack }) => {

    const [motivo, setMotivo] = useState('');

    const enviarSolicitud = () => {
        console.log({
            petId: pet.id,
            motivo
        });

        alert("Solicitud enviada 🐶");
        goBack();
    };

    return (
        <View style={{ padding:20 }}>
            <Text>Adoptar a: {pet.name}</Text>

            <TextInput
                placeholder="Motivo"
                value={motivo}
                onChangeText={setMotivo}
                style={{ borderWidth:1, marginVertical:10 }}
            />

            <Button title="Enviar solicitud" onPress={enviarSolicitud} />
        </View>
    );
};

export default PantallaAdoptionRequest;