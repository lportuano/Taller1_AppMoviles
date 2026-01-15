import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Vibration } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';

export default function LoginScreen({ navigation }: any) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={()=>navigation.navigate("Tab")}
                >
                    <Text style={styles.textBtn}>START MISSION</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                    <Text style={styles.linkText}>¿No tienes cuenta? <Text style={styles.linkHighlight}>Regístrate aquí</Text></Text>
                </TouchableOpacity>
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        color: "#00f2ff",
        fontSize: 40,
        marginBottom: 50,
        fontWeight: "900",
        letterSpacing: 3,
        textShadowColor: 'rgba(0, 242, 255, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    fieldLabel: {
        color: '#ff79c6',
        alignSelf: 'flex-start',
        marginLeft: '8%',
        marginBottom: 5,
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1.5
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
        borderColor: 'rgba(0, 242, 255, 0.3)',
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
        shadowOpacity: 0.5,
    },
    textBtn: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        letterSpacing: 2
    },
    linkText: {
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 30,
        fontSize: 15,
    },
    linkHighlight: {
        color: '#00f2ff',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
})