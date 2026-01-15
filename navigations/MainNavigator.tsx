import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "../Screens/WelcomeScreen";
import JuegoScreen from "../Screens/JuegoScreen";
import Puntuacion from "../Screens/PuntuacionScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegistroScreen from "../Screens/RegistroScreen";
import PerfilUsuarioScreen from "../Screens/PerfilUsuarioScreen";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function MyStack (){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name="Registro" component={RegistroScreen} options={{headerShown: false}} />
            <Stack.Screen name="Tab" component={MyTab} />
        </Stack.Navigator>
    )
}

function MyTab(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="usuario" component={PerfilUsuarioScreen} options={{headerShown: false}} />
            <Tab.Screen name="juego" component={JuegoScreen} options={{headerShown: false}} />
            <Tab.Screen name="puntuacion" component={Puntuacion} options={{headerShown: false}} />
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