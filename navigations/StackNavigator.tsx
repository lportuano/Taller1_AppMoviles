import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../Screens/LoginScreen";
import JuegoScreen from "../Screens/JuegoScreen";
import Puntuacion from "../Screens/PuntuacionScreen";


const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" 
            component={LoginScreen}
            options={{headerShown:false}}
            
            />
            <Stack.Screen name="Juego" component={JuegoScreen} />
            
            <Stack.Screen name="Puntuacion" component={Puntuacion} />
        </Stack.Navigator>
    )
}

export default function StackNav() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}