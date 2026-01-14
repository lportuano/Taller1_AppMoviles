import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Vibration } from 'react-native'
import React, { useState } from 'react'

export default function LoginScreen({ navigation }: any) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        
    };

    return (
        <ImageBackground 
            source={{ uri: "https://www.xtrafondos.com/thumbs/vertical/webp/1_5474.webp" }}
            style={styles.container}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Login</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Correo electrónico"
                        placeholderTextColor="#000000"
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                    />
                    
                    <TextInput
                        placeholder="Contraseña"
                        placeholderTextColor="#000000"
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.btnLogin}
                    onPress={handleLogin}
                >
                    <Text style={styles.textBtn}>Ingresar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                    <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        color: "white",
        fontSize: 45,
        marginBottom: 40,
        fontWeight: "bold",
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.39)',
        width: '85%',
        height: 60,
        borderRadius: 30,
        paddingHorizontal: 25,
        fontSize: 18,
        color: 'white',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        fontWeight: 'bold'
    },
    btnLogin: {
        backgroundColor: "#a1a1a1",
        height: 70,
        width: "80%",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    textBtn: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1a1a1a",
    },
    linkText: {
        color: 'white',
        marginTop: 25,
        fontSize: 16,
        textDecorationLine: 'underline',
    }
})