import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

// --- PASO 1: IMPORTAR EXPO-FONT ---
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const carouselImages = [
  { id: '1', uri: 'https://www.xtrafondos.com/thumbs/vertical/webp/1_11201.webp' },
  { id: '2', uri: 'https://www.xtrafondos.com/thumbs/vertical/webp/1_3068.webp' },
  { id: '3', uri: 'https://www.xtrafondos.com/thumbs/vertical/webp/1_13162.webp' },
  { id: '4', uri: 'https://www.xtrafondos.com/thumbs/vertical/webp/1_3228.webp' },
  { id: '5', uri: 'https://www.xtrafondos.com/thumbs/vertical/webp/1_12036.webp' },
];

export default function WelcomeScreen({ navigation }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // --- PASO 2: CARGAR LA FUENTE 'MARIO' ---
  const [fontsLoaded] = useFonts({
    'MarioFont': require('../assets/fonts/mario.otf'),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (activeIndex + 1) % carouselImages.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Si la fuente no ha cargado, no renderizamos nada (evita errores visuales)
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* FONDO CARRUSEL */}
      <View style={StyleSheet.absoluteFill}>
        <FlatList
          ref={flatListRef}
          data={carouselImages}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={styles.backgroundStep} blurRadius={3} />
          )}
        />
        {/* Capa oscura para mejorar contraste */}
        <View style={styles.darkFilter} />
      </View>

      <View style={styles.overlay}>
        <View style={styles.topContent}>
          {/* APLICADO: Fuente Mario */}
          <Text style={styles.title}>WELCOME</Text>
          <Text style={styles.subtitle}>— READY TO PLAY? —</Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* BOTÓN LOGIN */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={[styles.btn, { borderColor: '#a020f0' }]}
          >
            <View style={[styles.btnInner, { backgroundColor: 'rgba(160, 32, 240, 0.2)' }]}>
              <Image style={styles.img} source={require("../assets/images/play.png")} />
              <Text style={styles.btnText}>START MISSION</Text>
            </View>
          </TouchableOpacity>

          {/* BOTÓN REGISTRO */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Registro")}
            style={[styles.btn, { borderColor: '#00f2ff' }]}
          >
            <View style={[styles.btnInner, { backgroundColor: 'rgba(0, 242, 255, 0.1)' }]}>
              <Image style={styles.img} source={require("../assets/images/xbox.png")} />
              <Text style={styles.btnText}>NEW PLAYER</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>v 1.0.4 • 2026</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  backgroundStep: { width: width, height: height },
  darkFilter: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 100
  },
  topContent: { alignItems: 'center' },
  title: {
    color: "#fff",
    fontSize: 55,
    letterSpacing: 6,
    textShadowColor: '#00f2ff',
    textShadowRadius: 15,
    // --- PASO 3: ASIGNAR EL NOMBRE DE LA FUENTE ---
    fontFamily: 'MarioFont',
  },
  subtitle: {
    color: "#00f2ff",
    fontSize: 14,
    letterSpacing: 4,
    marginTop: 5,
    // --- TAMBIÉN AQUÍ ---
    fontFamily: 'MarioFont',
  },
  buttonContainer: { width: '100%', alignItems: 'center', gap: 20 },
  btn: {
    width: "85%",
    height: 65,
    borderRadius: 5,
    borderWidth: 2,
    overflow: 'hidden'
  },
  btnInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15
  },
  btnText: {
    fontSize: 18,
    color: "white",
    letterSpacing: 2,
    // --- TAMBIÉN EN BOTONES SI QUIERES EL ESTILO COMPLETO ---
    fontFamily: 'MarioFont',
  },
  img: { height: 26, width: 26, tintColor: 'white' },
  footerText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    letterSpacing: 3,
    fontFamily: 'MarioFont',
  }
})