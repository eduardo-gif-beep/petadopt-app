import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import PantallaAdminPets from "../views/PantallaAdminPets";
import PantallaAdoptionRequest from "../views/PantallaAdopcionRequest";
import PantallaLogin from "../views/PantallaLogin";
import PantallaPets from "../views/PantallaPets";
import PantallaRegister from "../views/PantallaRegister";
import PantallaRequests from "../views/PantallaRequest";
import PantallaRegisterPet from "../views/PantallaRegisterPet";
import PantallaPerfil from "../views/PantallaPerfil";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">

            <Stack.Screen name="Login" component={PantallaLogin} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={PantallaRegister} options={{ headerShown: false }}/>
            <Stack.Screen name="Pets" component={PantallaPets} options={{ headerShown: false }}/>
            <Stack.Screen name="Request" component={PantallaAdoptionRequest} options={{ headerShown: false }}/>
            <Stack.Screen name="Requests" component={PantallaRequests} options={{ headerShown: false }}/>
            <Stack.Screen name="Admin" component={PantallaAdminPets} options={{ headerShown: false }}/>
            <Stack.Screen name="RegisterPet" component={PantallaRegisterPet} options={{ headerShown: false }}/>
            <Stack.Screen name="Profile" component={PantallaPerfil} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};

export default AppNavigator;