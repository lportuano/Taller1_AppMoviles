  import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
  import React, { useState } from 'react'

  export default function RegistroScreen({ navigation }: any) {
    const [usuario, setUsuario] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegistro = () => {
      if (!email || !password || !usuario) {
        Alert.alert("Error", "Por favor llena todos los campos");
        return;
      }
      Alert.alert("Éxito", "Usuario registrado");
    }

    return (
      <ImageBackground
        source={{ uri: "https://www.xtrafondos.com/thumbs/vertical/webp/1_13421.webp" }}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>REGISTRO</Text>
          <Text style={styles.subtitle}>Crea tu cuenta de jugador</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Nombre de usuario"
              placeholderTextColor="rgba(255,255,255,0.7)"
              style={styles.input}
              onChangeText={(text) => setUsuario(text)}
            />

            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor="rgba(255,255,255,0.7)"
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="rgba(255,255,255,0.7)"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <TouchableOpacity
            style={[styles.btn, styles.btnLogin]} 
            onPress={() => navigation.navigate("Login")}
          >
            <View style={styles.content}>
              <Text style={styles.btnText}>REGISTRAR</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>¿Ya tienes cuenta? Logéate aquí</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>VERSION 1.0.2 - 2026</Text>
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
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: "center",
      alignItems: "center",
      padding: 20
    },
    title: {
      color: "#00f2ff",
      fontSize: 50,
      fontWeight: "900",
      letterSpacing: 5,
      textShadowColor: 'rgba(0, 242, 255, 0.8)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 15,
    },
    subtitle: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "300",
      letterSpacing: 2,
      marginBottom: 40,
      textTransform: "uppercase"
    },
    inputContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 20,
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      width: '90%',
      height: 60,
      borderRadius: 10,
      paddingHorizontal: 20,
      fontSize: 16,
      color: 'white',
      marginBottom: 15,
      borderWidth: 1,
      borderColor: 'rgba(0, 242, 255, 0.3)', 
    },
    btn: {
      height: 65,
      width: "90%",
      borderRadius: 10,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: 'center',
      elevation: 10,
      shadowColor: '#6200ee',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
    },
    btnLogin: {
      backgroundColor: "#6200ee",
      borderColor: "#bb86fc",
      marginTop: 10,
      marginBottom: 10,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
    },
    btnText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
      letterSpacing: 2,
    },
    linkText: {
      color: '#00f2ff',
      marginTop: 25,
      fontSize: 14,
      textDecorationLine: 'underline',
      fontWeight: '600'
    },
    footerText: {
      position: 'absolute',
      bottom: 30,
      color: 'rgba(255,255,255,0.3)',
      fontSize: 10,
      letterSpacing: 2
    }
  })