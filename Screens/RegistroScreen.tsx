import {
  ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity,
  View, Alert, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'
import RNPickerSelect from 'react-native-picker-select';

export default function RegistroScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nick, setNick] = useState('')

  const [pais, setPais] = useState<string | null>(null)
  const [genero, setGenero] = useState<string | null>(null)

  async function registro() {
    if (!email || !password || !usuario || !nick || !pais || !genero) {
      Alert.alert("ERROR", "Completa todos los campos para continuar.");
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.overlay}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
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

              {/* LISTA DE PAÍS */}
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  placeholder={{ label: "Selecciona tu País", value: null, color: '#9EA0A4' }}
                  onValueChange={(value) => setPais(value)}
                  items={[
                    { label: 'Argentina', value: 'Argentina' },
                    { label: 'Bolivia', value: 'Bolivia' },
                    { label: 'Brasil', value: 'Brasil' },
                    { label: 'Chile', value: 'Chile' },
                    { label: 'Colombia', value: 'Colombia' },
                    { label: 'Costa Rica', value: 'Costa Rica' },
                    { label: 'Cuba', value: 'Cuba' },
                    { label: 'Ecuador', value: 'Ecuador' },
                    { label: 'El Salvador', value: 'El Salvador' },
                    { label: 'España', value: 'España' },
                    { label: 'Estados Unidos', value: 'Estados Unidos' },
                    { label: 'Guatemala', value: 'Guatemala' },
                    { label: 'Honduras', value: 'Honduras' },
                    { label: 'México', value: 'México' },
                    { label: 'Nicaragua', value: 'Nicaragua' },
                    { label: 'Panamá', value: 'Panamá' },
                    { label: 'Paraguay', value: 'Paraguay' },
                    { label: 'Perú', value: 'Perú' },
                    { label: 'Puerto Rico', value: 'Puerto Rico' },
                    { label: 'República Dominicana', value: 'República Dominicana' },
                    { label: 'Uruguay', value: 'Uruguay' },
                    { label: 'Venezuela', value: 'Venezuela' },
                    { label: 'Canadá', value: 'Canadá' },
                    { label: 'Francia', value: 'Francia' },
                    { label: 'Alemania', value: 'Alemania' },
                    { label: 'Italia', value: 'Italia' },
                    { label: 'Reino Unido', value: 'Reino Unido' },
                    { label: 'Japón', value: 'Japón' },
                    { label: 'China', value: 'China' },
                    { label: 'Otro', value: 'Otro' },
                  ]}
                  style={pickerStyles}
                  value={pais}
                  useNativeAndroidPickerStyle={false}
                />
              </View>

              {/* LISTA DE GÉNERO */}
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  placeholder={{ label: "Selecciona tu Género", value: null, color: '#9EA0A4' }}
                  onValueChange={(value) => setGenero(value)}
                  items={[
                    { label: 'Masculino', value: 'Masculino' },
                    { label: 'Femenino', value: 'Femenino' },
                    { label: 'Otros', value: 'Otros' },
                  ]}
                  style={pickerStyles}
                  value={genero}
                  useNativeAndroidPickerStyle={false}
                />
              </View>

              <TextInput
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="rgba(255,255,255,0.5)"
                style={[styles.input, { borderColor: '#00f2ff' }]}
                autoCapitalize="none"
                keyboardType="email-address"
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
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    color: "#00f2ff",
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 30,
    letterSpacing: 4,
    textAlign: 'center'
  },
  inputContainer: {
    width: '100%'
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    width: '100%',
    height: 55,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: 'white',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#00f2ff'
  },
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    width: '100%',
    height: 55,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#00f2ff',
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: "#6200ee",
    height: 60,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
    shadowColor: '#00f2ff',
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2
  }
})

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 20,
    color: 'white',
    paddingRight: 30,
    height: 55,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 20,
    color: 'white',
    paddingRight: 30,
    height: 55,
  },
  placeholder: {
    color: 'rgba(255,255,255,0.5)',
  },
});