import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import JuegoScreen from "../Screens/JuegoScreen";
import Puntuacion from "../Screens/PuntuacionScreen";
import { NavigationContainer } from "@react-navigation/native";


import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Top = createBottomTabNavigator()

function MyTop() {
    return (
        <Top.Navigator>

            <Top.Screen name="Juegos" component={JuegoScreen}
                options={{
                    tabBarIcon: () =>
                        <Entypo name="game-controller" size={24} color="black" />
                }}
            />

            <Top.Screen name="PuntuacionJuego" component={Puntuacion}
                options={{
                    tabBarIcon: () =>
                        <MaterialCommunityIcons name="scoreboard" size={24} color="black" />
                }}
            />

        </Top.Navigator>
    )

}

export default function TopNav() {
    return (
        <NavigationContainer>
            <MyTop />
        </NavigationContainer>
    )
}