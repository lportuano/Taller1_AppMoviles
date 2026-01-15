import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "../Screens/WelcomeScreen";
import JuegoScreen from "../Screens/JuegoScreen";
import Puntuacion from "../Screens/PuntuacionScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegistroScreen from "../Screens/RegistroScreen";
import PerfilUsuarioScreen from "../Screens/PerfilUsuarioScreen";

//Iconos

import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Tab" component={MyTab} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function MyTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#1e1e2e', // Color de fondo oscuro (Gaming)
                    borderTopWidth: 2,
                    borderTopColor: '#00f2ff', // Línea superior Neón
                    height: 60,
                    paddingBottom: 5,
                },
                tabBarActiveTintColor: '#00f2ff',   // Color del icono seleccionado (Cyan)
                tabBarInactiveTintColor: '#6272a4', // Color del icono no seleccionado
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                },
            }}
        >
            <Tab.Screen name="usuario" component={PerfilUsuarioScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: () =>
                        <Feather name="user" size={24} color="#00f2ff" />
                }}
            />
            <Tab.Screen name="juego" component={JuegoScreen} options={{
                headerShown: false,
                tabBarIcon: () =>
                    <Entypo name="game-controller" size={24} color="#00f2ff" />
            }}
            />
            <Tab.Screen name="puntuacion" component={Puntuacion}
                options={{
                    headerShown: false,
                    tabBarIcon: () =>
                        <MaterialCommunityIcons name="scoreboard" size={24} color="#00f2ff" />
                }}
            />
        </Tab.Navigator>
    )
}

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}