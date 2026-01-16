import React from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';

// Datos de ejemplo (Normalmente esto vendría de una Base de Datos o AsyncStorage)
const DATA = [
    { id: '1', nombre: 'KillerPro', puntos: 150 },
    { id: '2', nombre: 'CyberPlayer', puntos: 124 },
    { id: '3', nombre: 'RexGamer', puntos: 98 },
    { id: '4', nombre: 'TuUsuario', puntos: 85 },
    { id: '5', nombre: 'NoobMaster69', puntos: 40 },
];

export default function PuntuacionScreen() {

    // Diseño de cada fila de la lista
    const renderItem = ({ item, index }: any) => (
        <View style={styles.itemContainer}>
            <Text style={styles.rankText}>#{index + 1}</Text>
            <Text style={styles.nameText}>{item.nombre}</Text>
            <Text style={styles.pointsText}>{item.puntos} PTS</Text>
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

                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
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
        backgroundColor: 'rgba(0,0,0,0.8)', // Un poco más oscuro para leer bien la lista
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
    list: {
        width: '100%',
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 8,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeftWidth: 4,
        borderLeftColor: '#6200ee', // Color violeta neón
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
        flex: 1, // Toma el espacio del medio
    },
    pointsText: {
        color: '#bb86fc',
        fontSize: 18,
        fontWeight: 'bold',
    },
});