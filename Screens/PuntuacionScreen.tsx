import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { supabase } from '../supabase/config';

export default function PuntuacionScreen() {
    const [puntuaciones, setPuntuaciones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const [fontsLoaded] = useFonts({
        'GowFont': require('../assets/fonts/gow.ttf'),
    });

    useEffect(() => {
        obtenerUsuarioYRanking();
    }, []);

    async function obtenerUsuarioYRanking() {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setCurrentUserId(user.id);
            await traerPuntuaciones();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function traerPuntuaciones() {
        try {
            const { data, error } = await supabase
                .from('puntuacionUsuario')
                .select(`
                    puntuacion,
                    uid,
                    registroUsuario!inner ( nick )
                `)
                .order('puntuacion', { ascending: false });

            if (error) throw error;
            if (data) setPuntuaciones(data);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    const renderItem = ({ item, index }: any) => {
        const esUsuarioActual = item.uid === currentUserId;

        return (
            <View style={[
                styles.itemContainer,
                esUsuarioActual && styles.usuarioActualContainer
            ]}>
                <Text style={[styles.rankText, esUsuarioActual && styles.textoResaltado]}>
                    #{index + 1}
                </Text>
                <Text style={[styles.nameText, esUsuarioActual && styles.textoResaltado]}>
                    {item.registroUsuario?.nick} {esUsuarioActual ? "(TÚ)" : ""}
                </Text>
                <Text style={[styles.pointsText, esUsuarioActual && styles.textoResaltado]}>
                    {item.puntuacion} PTS
                </Text>
            </View>
        );
    };

    if (!fontsLoaded) return null;

    return (
        <ImageBackground
            source={{ uri: 'https://www.xtrafondos.com/thumbs/vertical/webp/1_13421.webp' }}
            style={styles.container}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>TOP PLAYERS</Text>

                <View style={styles.tableHeader}>
                    <Text style={styles.headerLabel}>RANK</Text>
                    <Text style={styles.headerLabel}>PLAYER</Text>
                    <Text style={styles.headerLabel}>SCORE</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#00f2ff" style={{ marginTop: 50 }} />
                ) : (
                    <FlatList
                        data={puntuaciones}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.list}
                        showsVerticalScrollIndicator={false}
                        onRefresh={traerPuntuaciones}
                        refreshing={loading}
                    />
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'GowFont',
        color: "#00f2ff",
        fontSize: 35,
        textAlign: 'center',
        letterSpacing: 3,
        textShadowColor: 'rgba(0, 242, 255, 0.8)',
        textShadowRadius: 15,
        marginBottom: 30,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 242, 255, 0.3)',
        paddingBottom: 5,
    },
    headerLabel: {
        fontFamily: 'GowFont',
        color: 'rgba(255,255,255,0.6)',
        fontSize: 10,
    },
    list: { width: '100%' },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 8,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeftWidth: 4,
        borderLeftColor: '#00f2ff',
    },
    usuarioActualContainer: {
        backgroundColor: 'rgba(255, 215, 0, 0.15)',
        borderLeftColor: '#ffd700',
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.5)',
    },
    textoResaltado: {
        color: '#ffd700',
        textShadowColor: 'rgba(255, 215, 0, 0.5)',
        textShadowRadius: 10,
    },
    rankText: {
        fontFamily: 'GowFont',
        color: '#00f2ff',
        fontSize: 16,
        width: 50,
    },
    nameText: {
        fontFamily: 'GowFont',
        color: '#fff',
        fontSize: 16,
        flex: 1,
    },
    pointsText: {
        fontFamily: 'GowFont',
        color: '#50fa7b',
        fontSize: 16,
    },
});