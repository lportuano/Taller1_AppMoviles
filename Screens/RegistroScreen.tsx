import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'

export default function RegistroScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nick, setNick] = useState('')
  const [pais, setPais] = useState('')
  const [genero, setGenero] = useState('')

  async function registro() {
    if (!email || !password || !usuario || !nick) {
      Alert.alert("ERROR", "Completa los campos principales para continuar.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert("ERROR DE AUTH", error.message);
      return;
    }

    if (data.user) {
      await guardarUsuario(data.user.id);
      Alert.alert("ÉXITO", "Usuario registrado correctamente.");
      navigation.navigate("Login");
    }
  }

  async function guardarUsuario(uid: string) {
    const { error } = await supabase
      .from('registroUsuario')
      .insert({
        id: uid,
        usuario: usuario,
        email: email,
        nick: nick,
        pais: pais,
        genero: genero
      })

    if (error) {
      console.log("Error al insertar:", error.message);
    }
  }

  return (
    <ImageBackground
      source={{ uri: "https://www.xtrafondos.com/thumbs/vertical/webp/1_13421.webp" }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>REGISTRO</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Nombre Real"
              value={usuario}
              onChangeText={setUsuario}
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={[styles.input, { borderColor: '#00f2ff' }]}
            />
            <TextInput
              placeholder="Nick / Gamertag"
              value={nick}
              onChangeText={setNick}
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={[styles.input, { borderColor: '#00f2ff' }]}
            />
            <TextInput
              placeholder="País"
              value={pais}
              onChangeText={setPais}
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={[styles.input, { borderColor: '#00f2ff' }]}
            />
            <TextInput
              placeholder="Género"
              value={genero}
              onChangeText={setGenero}
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={[styles.input, { borderColor: '#00f2ff' }]}
            />
            <TextInput
              placeholder="Correo Electrónico"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={[styles.input, { borderColor: '#00f2ff' }]}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={[styles.input, { borderColor: '#00f2ff' }]}
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={registro}>
            <Text style={styles.btnText}>CREAR CUENTA</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' },
  scrollContent: { alignItems: "center", padding: 30, paddingTop: 80 },
  title: { color: "#00f2ff", fontSize: 40, fontWeight: "900", marginBottom: 40, letterSpacing: 4 },
  inputContainer: { width: '100%' },
  input: { backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '100%', height: 55, borderRadius: 10, paddingHorizontal: 20, color: 'white', marginBottom: 15, borderWidth: 1, borderColor: 'rgba(0, 242, 255, 0.2)' },
  btn: { backgroundColor: "#6200ee", height: 60, width: "100%", borderRadius: 10, justifyContent: "center", alignItems: 'center', marginTop: 20 },
  btnText: { color: "white", fontSize: 18, fontWeight: "bold", letterSpacing: 2 }
})