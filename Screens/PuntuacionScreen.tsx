import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, ActivityIndicator } from 'react-native';

import { supabase } from '../supabase/config';

export default function PuntuacionScreen() {

    const [puntuaciones, setPuntuaciones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        traerPuntuaciones();
    }, []);

    async function traerPuntuaciones() {
        try {
            setLoading(true);
            
            const { data, error } = await supabase
                .from('puntuacionUsuario')
                .select(`
                puntuacion,
                uid,
                registroUsuario!inner ( nick )
            `)
                .order('puntuacion', { ascending: false });

            if (error) throw error;

            if (data) {
                setPuntuaciones(data);
            }
        } catch (error) {
            console.error("Error al obtener ranking:", error.message);
        } finally {
            setLoading(false);
        }
    }


    const renderItem = ({ item, index }: any) => (
        <View style={styles.itemContainer}>
            <Text style={styles.rankText}>#{index + 1}</Text>
            <Text style={styles.nameText}>
                {item.registroUsuario?.nick}
            </Text>
            <Text style={styles.pointsText}>{item.puntuacion} PTS</Text>
        </View>
    );

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
        color: "#00f2ff",
        fontSize: 35,
        fontWeight: "900",
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
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        fontWeight: 'bold',
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
    rankText: {
        color: '#00f2ff',
        fontWeight: 'bold',
        fontSize: 16,
        width: 40,
    },
    nameText: {
        color: '#fff',
        fontSize: 18,
        flex: 1,
        fontWeight: '600'
    },
    pointsText: {
        color: '#50fa7b',
        fontSize: 18,
        fontWeight: 'bold',
    },
});