import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "../Screens/WelcomeScreen";
import JuegoScreen from "../Screens/JuegoScreen";
import Puntuacion from "../Screens/PuntuacionScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegistroScreen from "../Screens/RegistroScreen";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function MyStack (){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Stack.Screen name="Tab" component={MyTab} />
        </Stack.Navigator>
    )
}

function MyTab(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="juego" component={JuegoScreen} />
            <Tab.Screen name="puntuacion" component={Puntuacion} />
        </Tab.Navigator>
    )
}

export default function MainNavigator(){
    return(
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}