import { Image, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {

  // Función para ir al Login
  function Login() {
    navigation.navigate("Login")
  }

  // Función para ir al Registro
  function Registro() {
    navigation.navigate("Registro");
  }

  return (
    <ImageBackground 
      source={{ uri: "https://www.xtrafondos.com/thumbs/vertical/webp/1_5474.webp" }}
      style={styles.container}
    >
      <Text style={{ color: "white", fontSize: 50, marginBottom: 20, fontWeight: "bold" }}>Welcome</Text>

      {/* Botón para Login */}
      <TouchableOpacity
        onPress={() => Login()}
        style={styles.btn}
      >
        <View style={{ flexDirection: "row-reverse", alignItems: "center", gap: 15 }} >
          <Text style={{ fontSize: 20, fontWeight: "bold" }} >Login</Text>
          <Image
            style={styles.img}
            source={require("../assets/images/play.png")} />
        </View>
      </TouchableOpacity>

      {/* Botón para Registro */}
      <TouchableOpacity
        onPress={() => Registro()}
        style={styles.btn2}
      >
        <View style={{ flexDirection: "row-reverse", alignItems: "center", gap: 15 }} >
          <Text style={{ fontSize: 20, fontWeight: "bold" }} >Registro</Text>
          <Image
            style={styles.img}
            source={require("../assets/images/xbox.png")} />
        </View>
      </TouchableOpacity>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  btn: {
    backgroundColor: "#a1a1a1",
    height: 70,
    width: "80%",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  btn2: {
    backgroundColor: "#a1a1a1",
    height: 70,
    width: "80%",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  img: {
    height: 50,
    width: 50,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})