import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Dimensions, Image, Vibration, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { supabase } from '../supabase/config';

const { width, height } = Dimensions.get('window');

interface Hormiga {
    id: number;
    x: number;
    y: Animated.Value;
    speed: number;
}

interface Mancha {
    id: number;
    x: number;
    y: number;
}

export default function JuegoScreen() {
    const [puntos, setPuntos] = useState(0);
    const [tiempo, setTiempo] = useState(10);
    const [activo, setActivo] = useState(false);
    const [hormigas, setHormigas] = useState<Hormiga[]>([]);
    const [manchas, setManchas] = useState<Mancha[]>([]);
    const nextId = useRef(0);

    const player = useAudioPlayer(require('../assets/sounds/splat.mp3'));

    const [fontsLoaded] = useFonts({
        'GowFont': require('../assets/fonts/gow.ttf'),
    });

    const reproducirSonido = () => {
        if (player.playing) {
            player.seekTo(0);
        }
        player.play();
    };

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
                    if (nuevoTiempo <= 3 && nuevoTiempo > 0) Vibration.vibrate([0, 100]);
                    return nuevoTiempo;
                });
            }, 1000);
        } else if (tiempo === 0) {
            finalizarJuego();
        }
        return () => clearInterval(intervalo);
    }, [activo, tiempo]);

    useEffect(() => {
        let generador: any;
        if (activo) {
            generador = setInterval(() => {
                crearHormiga();
            }, 800);
        } else {
            setHormigas([]);
        }
        return () => clearInterval(generador);
    }, [activo]);

    const crearHormiga = () => {
        const id = nextId.current++;
        const x = Math.random() * (width - 60);
        const y = new Animated.Value(-100);
        const speed = Math.random() * 2000 + 2000;

        const nuevaHormiga = { id, x, y, speed };
        setHormigas(prev => [...prev, nuevaHormiga]);

        Animated.timing(y, {
            toValue: height + 100,
            duration: speed,
            useNativeDriver: false,
        }).start(({ finished }) => {
            if (finished) {
                eliminarHormiga(id);
            }
        });
    };

    const eliminarHormiga = (id: number) => {
        setHormigas(prev => prev.filter(h => h.id !== id));
    };

    const aplastarHormiga = (id: number, x: number, yAnim: any) => {
        reproducirSonido();
        Vibration.vibrate(50);
        const yActual = yAnim._value;
        const nuevaMancha = { id: Date.now(), x, y: yActual };
        setManchas(prev => [...prev, nuevaMancha]);
        setTimeout(() => {
            setManchas(prev => prev.filter(m => m.id !== nuevaMancha.id));
        }, 2000);
        setPuntos(p => p + 1);
        eliminarHormiga(id);
    };

    const finalizarJuego = () => {
        setActivo(false);
        Vibration.vibrate(500);
        guardarPuntuacion(puntos);
        Alert.alert("¡BATALLA FINALIZADA!", `Has aplastado ${puntos} insectos.`);
        reiniciarJuego();
    };

    const reiniciarJuego = () => {
        setPuntos(0);
        setTiempo(10);
        setActivo(false);
        setHormigas([]);
        setManchas([]);
    };

    if (!fontsLoaded) return null;

    return (
        <ImageBackground
            source={{ uri: 'https://i.postimg.cc/TPRMWpd0/fondo.webp' }}
            style={styles.container}
        >
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <View style={styles.statCard}>
                        <Text style={styles.label}>CRONOS</Text>
                        <Text style={[styles.statsText, tiempo <= 3 && styles.tiempoCritico]}>
                            {tiempo}s
                        </Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.label}>ALMAS</Text>
                        <Text style={styles.statsText}>{puntos}</Text>
                    </View>
                </View>

                {manchas.map((mancha) => (
                    <Image
                        key={mancha.id}
                        source={{ uri: 'https://i.postimg.cc/bw60hBBx/splat.png' }}
                        style={[styles.sangre, { left: mancha.x, top: mancha.y }]}
                    />
                ))}

                {!activo && (
                    <TouchableOpacity style={styles.instructionBox} onPress={() => setActivo(true)}>
                        <Text style={styles.instruction}>INICIAR MASACRE</Text>
                        <Text style={styles.subInstruction}>TOCA AQUÍ PARA COMENZAR</Text>
                    </TouchableOpacity>
                )}

                {hormigas.map((hormiga) => (
                    <Animated.View
                        key={hormiga.id}
                        style={[
                            styles.target,
                            {
                                left: hormiga.x,
                                top: hormiga.y,
                                transform: [{ rotate: '180deg' }]
                            }
                        ]}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => aplastarHormiga(hormiga.id, hormiga.x, hormiga.y)}
                            style={styles.targetWrapper}
                        >
                            <Image
                                source={{ uri: 'https://i.postimg.cc/XJwVPSsg/R.png' }}
                                style={styles.imageTarget}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                ))}

                <TouchableOpacity style={styles.resetBtn} onPress={reiniciarJuego}>
                    <Text style={styles.resetBtnText}>REINICIAR DESAFÍO</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 60,
        zIndex: 10,
    },
    statCard: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderWidth: 2,
        borderColor: '#37c9d4',
        borderRadius: 20,
        minWidth: 120,
        alignItems: 'center',
    },
    label: { fontFamily: 'GowFont', color: '#ffffff', fontSize: 10, marginBottom: 2 },
    statsText: { fontFamily: 'GowFont', color: '#fff', fontSize: 20 },
    tiempoCritico: { color: '#ff0000', fontSize: 24 },
    instructionBox: {
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 100,
        backgroundColor: 'rgba(139, 0, 0, 0.6)',
        padding: 20,
        borderWidth: 2,
        borderColor: '#8b0000',
        zIndex: 20,
        borderRadius: 20
    },
    instruction: {
        fontFamily: 'GowFont',
        color: '#fff',
        fontSize: 28,
        letterSpacing: 2
    },
    subInstruction: { color: '#ffd700', fontSize: 10, fontWeight: 'bold', marginTop: 5 },
    target: {
        position: 'absolute',
        width: 70,
        height: 70,
    },
    sangre: {
        position: 'absolute',
        width: 80,
        height: 80,
        opacity: 0.8,
        resizeMode: 'contain',
    },
    targetWrapper: {
        width: '100%',
        height: '100%',
    },
    imageTarget: { width: '100%', height: '100%', resizeMode: 'contain' },
    resetBtn: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderWidth: 2,
        borderColor: '#37d4d4',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 10,
        borderRadius: 20
    },
    resetBtnText: { fontFamily: 'GowFont', color: '#37c2d4', fontSize: 14 },
});