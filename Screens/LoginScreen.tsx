import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Vibration, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

// --- PASO 1: IMPORTAR EXPO-FONT ---
import { useFonts } from 'expo-font';

//Biometria
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

import { supabase } from '../supabase/config';

export default function LoginScreen({ navigation }: any) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // --- PASO 2: CARGAR LA FUENTE 'MARIO' ---
    const [fontsLoaded] = useFonts({
        'MarioFont': require('../assets/fonts/mario.otf'),
    });

    useEffect(() => {
        checarSiHayDatos();
    }, [])

    async function guardarCredenciales(mail: string, pass: string, token: string) {
        await SecureStore.setItemAsync("userEmail", mail);
        await SecureStore.setItemAsync("userPass", pass);
        await SecureStore.setItemAsync("token", token);
    }

    async function checarSiHayDatos() {
        const savedEmail = await SecureStore.getItemAsync("userEmail");
        if (savedEmail) {
            // Lógica interna opcional
        }
    }

    async function login() {
        if (!email || !password) {
            Alert.alert("Campos incompletos", "Por favor ingresa correo y contraseña");
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            Alert.alert("ERROR", error.message);
            setLoading(false);
            return;
        }

        if (data.session) {
            await guardarCredenciales(email, password, data.session.access_token);
            navigation.navigate("Tab");
        }
        setLoading(false);
    }

    async function biometria() {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        if (!compatible) {
            return Alert.alert("No compatible", "Este dispositivo no soporta biometría.");
        }

        const authResultado = await LocalAuthentication.authenticateAsync({
            promptMessage: "Identifícate, Jugador",
            fallbackLabel: "Usar contraseña",
            disableDeviceFallback: false,
        });

        if (authResultado.success) {
            setLoading(true);
            const savedEmail = await SecureStore.getItemAsync("userEmail");
            const savedPass = await SecureStore.getItemAsync("userPass");

            if (savedEmail && savedPass) {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: savedEmail,
                    password: savedPass,
                });

                if (!error && data.session) {
                    Vibration.vibrate(50);
                    navigation.navigate("Tab");
                } else {
                    Alert.alert("Error de Sesión", "Los datos guardados ya no son válidos.");
                }
            } else {
                Alert.alert("Aviso", "Primero debes iniciar sesión manualmente una vez.");
            }
            setLoading(false);
        }
    }

    // Si la fuente no ha cargado, no mostramos nada para evitar el flash de fuente de sistema
    if (!fontsLoaded) return null;

    return (
        <ImageBackground
            source={{ uri: "https://www.xtrafondos.com/thumbs/vertical/webp/1_13421.webp" }}
            style={styles.container}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>PLAYER LOGIN</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.fieldLabel}>USER EMAIL</Text>
                    <TextInput
                        placeholder="ejemplo@gaming.com"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.fieldLabel}>PASSWORD</Text>
                    <TextInput
                        placeholder="********"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#00f2ff" />
                ) : (
                    <>
                        <TouchableOpacity style={styles.btnLogin} onPress={login}>
                            <Text style={styles.textBtn}>START MISSION</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnBiometric} onPress={biometria}>
                            <Ionicons name="finger-print" size={40} color="#00f2ff" />
                            <Text style={styles.textBiometric}>INGRESAR CON HUELLA</Text>
                        </TouchableOpacity>
                    </>
                )}

                <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                    <Text style={styles.linkText}>¿No tienes cuenta?
                        <Text style={styles.linkHighlight}> Regístrate aquí</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },

    title: {
        fontFamily: 'MarioFont',
        color: "#00f2ff",
        fontSize: 26,
        marginBottom: 50,
        letterSpacing: 2,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 242, 255, 0.8)',
        textShadowRadius: 15
    },

    inputContainer: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center'
    },

    fieldLabel: {
        fontFamily: 'MarioFont',
        color: '#ff79c6',
        alignSelf: 'flex-start',
        marginLeft: '8%',
        marginBottom: 8,
        fontSize: 10,
        letterSpacing: 1
    },

    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '85%',
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 20,
        fontSize: 16,
        color: 'white',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 242, 255, 0.3)'
    },

    btnLogin: {
        backgroundColor: "#6200ee",
        height: 65,
        width: "85%",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#bb86fc',
        elevation: 10,
        shadowColor: '#6200ee',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5
    },

    textBtn: {
        fontFamily: 'MarioFont',
        fontSize: 16,
        color: "white",
        letterSpacing: 1
    },

    btnBiometric: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textBiometric: {
        fontFamily: 'MarioFont',
        color: '#00f2ff',
        fontSize: 9,
        marginTop: 10,
        letterSpacing: 1
    },

    linkText: {
        fontFamily: 'MarioFont',
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 35,
        fontSize: 10,
        textAlign: 'center'
    },

    linkHighlight: {
        color: '#00f2ff',
        textDecorationLine: 'underline'
    }
})