import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Dimensions, Image } from 'react-native';

// Obtenemos las dimensiones de la pantalla para que no se salga de los bordes
const { width, height } = Dimensions.get('window');

export default function JuegoScreen() {
    const [puntos, setPuntos] = useState(0);
    const [tiempo, setTiempo] = useState(10);
    const [activo, setActivo] = useState(false);

    // Estados para la posición (inicia en el centro aproximado)
    const [posicion, setPosicion] = useState({
        top: height / 3,
        left: width / 2 - 75
    });

    useEffect(() => {
        let intervalo: any;
        if (activo && tiempo > 0) {
            intervalo = setInterval(() => {
                setTiempo((t) => t - 1);
            }, 1000);
        } else if (tiempo === 0) {
            setActivo(false);
            Alert.alert("¡TIEMPO AGOTADO!", `Lograste recolectar ${puntos} cristales.`);
            reiniciarJuego();
        }
        return () => clearInterval(intervalo);
    }, [activo, tiempo]);

    // Función para generar coordenadas aleatorias
    const moverObjeto = () => {
        // Restamos el tamaño del objeto (150) y un margen (50) para que no quede pegado al borde
        const nuevaTop = Math.random() * (height - 300) + 100;
        const nuevaLeft = Math.random() * (width - 150);
        setPosicion({ top: nuevaTop, left: nuevaLeft });
    };

    const manejarClick = () => {
        if (!activo) setActivo(true);
        setPuntos(puntos + 1);
        moverObjeto(); // Cada vez que tocas, se mueve
    };

    const reiniciarJuego = () => {
        setPuntos(0);
        setTiempo(10);
        setActivo(false);
        setPosicion({ top: height / 3, left: width / 2 - 75 });
    };

    return (
        <ImageBackground
            source={{ uri: 'https://www.xtrafondos.com/thumbs/vertical/webp/1_13421.webp' }}
            style={styles.container}
        >
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Text style={styles.statsText}>TIEMPO: {tiempo}s</Text>
                    <Text style={styles.statsText}>PUNTOS: {puntos}</Text>
                </View>

                {!activo && (
                    <Text style={styles.instruction}>Toca el cristal para comenzar</Text>
                )}

                {/* El cristal ahora tiene posición dinámica */}
                <TouchableOpacity
                    style={[
                        styles.target,
                        activo && styles.targetActive,
                        { top: posicion.top, left: posicion.left }
                    ]}
                    onPress={manejarClick}
                >
                    {/* REEMPLAZO DEL CÍRCULO POR UNA IMAGEN */}
                    <Image
                        source={{ uri: 'https://i.postimg.cc/zf5D3bMd/Multimedia.jpg' }} // Puedes cambiar esta URL por un cristal, una moneda o un enemigo
                        style={styles.imageTarget}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.resetBtn} onPress={reiniciarJuego}>
                    <Text style={styles.resetBtnText}>REINICIAR</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
        paddingTop: 60,
    },
    statsText: {
        color: '#00f2ff',
        fontSize: 22,
        fontWeight: 'bold',
        textShadowColor: '#00f2ff',
        textShadowRadius: 10,
    },
    instruction: {
        color: '#fff',
        fontSize: 18,
        letterSpacing: 2,
        textAlign: 'center',
        marginTop: 20,
        textTransform: 'uppercase',
    },
    target: {
        position: 'absolute', // Indispensable para que se mueva por coordenadas
        width: 120, // Lo hice un poco más pequeño para aumentar dificultad
        height: 120,
        backgroundColor: 'rgba(98, 0, 238, 0.3)',
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#bb86fc',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#bb86fc',
        shadowRadius: 20,
        shadowOpacity: 0.8,
    },
    targetActive: {
        borderColor: '#00f2ff',
    },
    crystalCore: {
        width: 40,
        height: 40,
        backgroundColor: '#00f2ff',
        transform: [{ rotate: '45deg' }],
        shadowColor: '#00f2ff',
        shadowRadius: 15,
        elevation: 15,
    },
    resetBtn: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
    },
    resetBtnText: {
        color: '#ff4b2b',
        fontWeight: 'bold',
        letterSpacing: 4,
        fontSize: 16,
    },

    target: {
        position: 'absolute',
        width: 100, // Ajusté el tamaño para que la imagen se vea mejor
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // Quitamos el fondo y bordes si queremos que solo se vea la imagen
    },

    targetActive: {
        transform: [{ scale: 1.2 }], // Efecto de pulsación al estar activo
    },
    imageTarget: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // Asegura que la imagen no se deforme
        // Sombra de neón para la imagen
        shadowColor: '#00f2ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
});