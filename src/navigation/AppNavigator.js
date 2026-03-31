import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PantallaLogin from "../views/PantallaLogin";
import PantallaRegister from "../views/PantallaRegister";
import PantallaPets from "../views/PantallaPets";
import PantallaAdoptionRequest from "../views/PantallaAdoptionRequest";
import PantallaRequests from "../views/PantallaRequests";
import PantallaAdminPets from "../views/PantallaAdminPets";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">

                <Stack.Screen name="Login" component={PantallaLogin} />
                <Stack.Screen name="Register" component={PantallaRegister} />
                <Stack.Screen name="Pets" component={PantallaPets} />
                <Stack.Screen name="Request" component={PantallaAdoptionRequest} />
                <Stack.Screen name="Requests" component={PantallaRequests} />
                <Stack.Screen name="Admin" component={PantallaAdminPets} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;    