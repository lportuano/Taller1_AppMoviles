import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Dimensions, Image, Vibration } from 'react-native';

import { supabase } from '../supabase/config';

const { width, height } = Dimensions.get('window');

export default function JuegoScreen() {
    const [puntos, setPuntos] = useState(0);
    const [tiempo, setTiempo] = useState(10);
    const [activo, setActivo] = useState(false);
    const [posicion, setPosicion] = useState({ top: height / 3, left: width / 2 - 75 });

    const guardarPuntuacion = async (puntosFinales: number) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data } = await supabase.from('puntuacionUsuario').select('puntuacion').eq('uid', user.id).maybeSingle();
            const recordAnterior = data ? parseInt(data.puntuacion) : 0;

            if (puntosFinales > recordAnterior) {
                await supabase.from('puntuacionUsuario').upsert({
                    uid: user.id,
                    puntuacion: puntosFinales.toString()
                }, { onConflict: 'uid' });
            }
        } catch (error) { console.error(error); }
    };

    useEffect(() => {
        let intervalo: any;
        if (activo && tiempo > 0) {
            intervalo = setInterval(() => {
                setTiempo((t) => {
                    const nuevoTiempo = t - 1;

                    if (nuevoTiempo <= 3 && nuevoTiempo > 0) {
                        Vibration.vibrate([0, 100]);
                    }

                    return nuevoTiempo;
                });
            }, 1000);
        } else if (tiempo === 0) {
            setActivo(false);
            Vibration.vibrate(500);
            guardarPuntuacion(puntos);
            Alert.alert("¡TIEMPO AGOTADO!", `Lograste recolectar ${puntos} insectos.`);
            reiniciarJuego();
        }
        return () => clearInterval(intervalo);
    }, [activo, tiempo]);

    const manejarClick = () => {
        if (!activo) setActivo(true);
        Vibration.vibrate(50);
        setPuntos((p) => p + 1);
        const nuevaTop = Math.random() * (height - 300) + 100;
        const nuevaLeft = Math.random() * (width - 150);
        setPosicion({ top: nuevaTop, left: nuevaLeft });
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

                    <Text style={[
                        styles.statsText,
                        tiempo <= 3 && styles.tiempoCritico
                    ]}>
                        TIEMPO: {tiempo}s
                    </Text>
                    <Text style={styles.statsText}>PUNTOS: {puntos}</Text>
                </View>

                {!activo && <Text style={styles.instruction}>Toca el insecto para comenzar</Text>}

                <TouchableOpacity
                    style={[styles.target, { top: posicion.top, left: posicion.left }]}
                    onPress={manejarClick}
                >
                    <Image source={{ uri: 'https://i.postimg.cc/XJwVPSsg/R.png' }} style={styles.imageTarget} />
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
        flex: 1
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
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

    tiempoCritico: {
        color: '#ff0000',
        textShadowColor: '#ff0000',
        fontSize: 26, // Un poco más grande para resaltar
    },
    instruction: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        textTransform: 'uppercase',
    },
    target: {
        position: 'absolute',
        width: 100,
        height: 100
    },
    imageTarget: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    resetBtn: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center'
    },
    resetBtnText: {
        color: '#ff4b2b',
        fontWeight: 'bold',
        fontSize: 16
    },
});