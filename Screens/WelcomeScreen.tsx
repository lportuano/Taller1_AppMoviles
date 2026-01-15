import { Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import React from 'react'

export default function WelcomeScreen({ navigation }: any) {

  function Login() {
    navigation.navigate("Login")
  }

  function Registro() {
    navigation.navigate("Registro");
  }

  return (
    <ImageBackground
      source={{ uri: "https://www.xtrafondos.com/thumbs/vertical/webp/1_13421.webp" }}
      style={styles.container}
    >
      {/* Overlay oscuro para que el texto resalte más */}
      <View style={styles.overlay}>

        <Text style={styles.title}>WELCOME</Text>
        <Text style={styles.subtitle}>Ready to Play?</Text>

        <View style={styles.buttonContainer}>
          {/* Botón para Login */}
          <TouchableOpacity
            onPress={() => Login()}
            style={[styles.btn, styles.btnLogin]}
          >
            <View style={styles.content} >
              <Text style={styles.btnText} >LOGIN</Text>
              <Image
                style={styles.img}
                source={require("../assets/images/play.png")} />
            </View>
          </TouchableOpacity>

          {/* Botón para Registro */}
          <TouchableOpacity
            onPress={() => Registro()}
            style={[styles.btn, styles.btnRegistro]}
          >
            <View style={styles.content} >
              <Text style={styles.btnText} >REGISTRO</Text>
              <Image
                style={styles.img}
                source={require("../assets/images/xbox.png")} />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>v 1.0.4 - 2024</Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Oscurece un poco el fondo para leer mejor
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    color: "#00f2ff", // Cyan Neón
    fontSize: 60,
    fontWeight: "900",
    letterSpacing: 5,
    textShadowColor: 'rgba(0, 242, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    marginBottom: 5,
  },
  subtitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "300",
    letterSpacing: 2,
    marginBottom: 60,
    textTransform: "uppercase"
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20
  },
  btn: {
    height: 75,
    width: "85%",
    borderRadius: 15, // Bordes menos redondeados para look tecnológico
    borderWidth: 2,
    justifyContent: "center",
    paddingHorizontal: 25,
    // Sombra para los botones
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
  },
  btnLogin: {
    backgroundColor: "#6200ee", // Púrpura intenso
    borderColor: "#bb86fc",
  },
  btnRegistro: {
    backgroundColor: "#1db954", // Verde tipo Xbox/Spotify
    borderColor: "#b3ffb3",
  },
  content: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },
  img: {
    height: 40,
    width: 40,
    tintColor: 'white', // Esto hace que los iconos se vean blancos y uniformes
  },
  footerText: {
    position: 'absolute',
    bottom: 30,
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    letterSpacing: 2
  }
})