import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import PantallaAdminPets from "../views/PantallaAdminPets";
import PantallaAdoptionRequest from "../views/PantallaAdopcionRequest";
import PantallaLogin from "../views/PantallaLogin";
import PantallaPets from "../views/PantallaPets";
import PantallaRegister from "../views/PantallaRegister";
import PantallaRequests from "../views/PantallaRequest";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">

            <Stack.Screen name="Login" component={PantallaLogin} />
            <Stack.Screen name="Register" component={PantallaRegister} />
            <Stack.Screen name="Pets" component={PantallaPets} />
            <Stack.Screen name="Request" component={PantallaAdoptionRequest} />
            <Stack.Screen name="Requests" component={PantallaRequests} />
            <Stack.Screen name="Admin" component={PantallaAdminPets} />

        </Stack.Navigator>
    );
};

export default AppNavigator;