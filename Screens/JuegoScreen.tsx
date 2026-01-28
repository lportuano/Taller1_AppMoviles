import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Dimensions, Image } from 'react-native';


import { supabase } from '../supabase/config';

const { width, height } = Dimensions.get('window');

export default function JuegoScreen() {
    const [puntos, setPuntos] = useState(0);
    const [tiempo, setTiempo] = useState(10);
    const [activo, setActivo] = useState(false);


    const [posicion, setPosicion] = useState({
        top: height / 3,
        left: width / 2 - 75
    });


    const guardarPuntuacion = async (puntosFinales: number) => {
        try {

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;


            const { data, error: fetchError } = await supabase
                .from('puntuacionUsuario')
                .select('puntuacion')
                .eq('uid', user.id)
                .maybeSingle();

            const recordAnterior = data ? parseInt(data.puntuacion) : 0;


            if (puntosFinales > recordAnterior) {
                const { error: upsertError } = await supabase
                    .from('puntuacionUsuario')
                    .upsert({
                        uid: user.id,
                        puntuacion: puntosFinales.toString()
                    }, { onConflict: 'uid' });

                if (upsertError) {
                    console.log("Error al actualizar récord:", upsertError.message);
                } else {
                    console.log("¡Nuevo récord guardado!");
                }
            } else {
                console.log("No superaste tu récord anterior.");
            }
        } catch (error) {
            console.error("Error inesperado en guardarPuntuacion:", error);
        }
    };

    useEffect(() => {
        let intervalo: any;
        if (activo && tiempo > 0) {
            intervalo = setInterval(() => {
                setTiempo((t) => t - 1);
            }, 1000);
        } else if (tiempo === 0) {
            setActivo(false);

            guardarPuntuacion(puntos);

            Alert.alert("¡TIEMPO AGOTADO!", `Lograste recolectar ${puntos} cristales.`);
            reiniciarJuego();
        }
        return () => clearInterval(intervalo);
    }, [activo, tiempo]);

    const moverObjeto = () => {
        const nuevaTop = Math.random() * (height - 300) + 100;
        const nuevaLeft = Math.random() * (width - 150);
        setPosicion({ top: nuevaTop, left: nuevaLeft });
    };

    const manejarClick = () => {
        if (!activo) setActivo(true);
        setPuntos(puntos + 1);
        moverObjeto();
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

                <TouchableOpacity
                    style={[
                        styles.target,
                        activo && styles.targetActive,
                        { top: posicion.top, left: posicion.left }
                    ]}
                    onPress={manejarClick}
                >
                    <Image
                        source={{ uri: 'https://i.postimg.cc/XJwVPSsg/R.png' }}
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
    container: { flex: 1 },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
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
        position: 'absolute',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    targetActive: { transform: [{ scale: 1.2 }] },
    imageTarget: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        shadowColor: '#00f2ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
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
});