import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config'
import * as SecureStore from 'expo-secure-store'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'

import Card from '../components/Card'

export default function PerfilUsuarioScreen({ navigation }: any) {
  const [perfil, setPerfil] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    traerDatos();
  }, [])

  async function traerDatos() {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data, error } = await supabase
          .from('registroUsuario')
          .select('usuario, nick, email, pais, genero, avatar')
          .eq('id', user.id)
          .maybeSingle()

        if (data) {
          setPerfil(data)

          if (data.avatar) {
            console.log("Imagen cargada de la DB:", data.avatar);
            setImage(data.avatar);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  async function subirImagen(uriSeleccionada: string) {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    // 1. Transformar a matriz de bits
    const response = await fetch(uriSeleccionada);
    const matrizBits = await response.arrayBuffer();

    const avatarFile = matrizBits;
    const { data, error } = await supabase
      .storage
      .from('jugadores')
      .upload('usuarios/' + userId + '.png', avatarFile, {
        contentType: "image/png",
        upsert: true
      });

    const urlPublica = traerURL(userId);

    await supabase
      .from('registroUsuario')
      .update({ avatar: urlPublica })
      .eq('id', userId);

    setImage(urlPublica + '?t=' + new Date().getTime());
    console.log(urlPublica);
  }

  // Función traerURL
  function traerURL(userId: any) {
    const { data } = supabase
      .storage
      .from('jugadores')
      .getPublicUrl('usuarios/' + userId + '.png');
    return data.publicUrl;
  }

  //logica para abrir la galeria
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso necesario', 'Se requiere acceso a la galería.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setModalVisible(false);
      subirImagen(result.assets[0].uri);
    }
  };

  //logica para abir la camara
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso necesario', 'Se requiere acceso a la cámara.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setModalVisible(false);
      subirImagen(result.assets[0].uri);
    }
  };

  async function cerrarSesion() {
    await supabase.auth.signOut()
    await SecureStore.deleteItemAsync("token")
    navigation.navigate("Welcome");
  }

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: '#000', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#00f2ff" />
        <Text style={styles.loadingText}>CARGANDO DATOS DEL JUGADOR...</Text>
      </View>
    )
  }

  return (
    <ImageBackground
      source={{ uri: "https://www.xtrafondos.com/thumbs/vertical/webp/1_13421.webp" }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.neonRing} />
              <Image
                source={{ uri: image || "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" }}
                style={styles.avatar}
              />
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={16} color="#000" />
              </View>
            </TouchableOpacity>

            <Text style={styles.userNick}>{perfil?.nick?.toUpperCase() || 'SIN GAMERTAG'}</Text>
            <Text style={styles.userStatus}>JUGADOR ONLINE</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.dataBox}>
              <Text style={styles.label}>NOMBRE REAL</Text>
              <Text style={styles.value}>{perfil?.usuario || 'No registrado'}</Text>
            </View>

            <View style={styles.dataBox}>
              <Text style={styles.label}>GAMERTAG / NICK</Text>
              <Text style={styles.value}>{perfil?.nick || 'N/A'}</Text>
            </View>

            <View style={styles.dataBox}>
              <Text style={styles.label}>PAÍS</Text>
              <Text style={styles.value}>{perfil?.pais || 'No definido'}</Text>
            </View>

            <View style={styles.dataBox}>
              <Text style={styles.label}>GÉNERO</Text>
              <Text style={styles.value}>{perfil?.genero || 'No especificado'}</Text>
            </View>

            <View style={[styles.dataBox, styles.emailBox]}>
              <Text style={[styles.label, { color: '#ff79c6' }]}>CORREO ELECTRÓNICO</Text>
              <Text style={styles.value}>{perfil?.email || 'Desconocido'}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={() => cerrarSesion()}>
            <Text style={styles.logoutText}>Cerrar Sesion</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

      <Card
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCamera={takePhoto}
        onGallery={pickImage}
      />
    </ImageBackground>
  )
}

// Estilos se mantienen igual...
const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.88)' },
  scrollContent: { padding: 25, paddingTop: 60, paddingBottom: 50, alignItems: 'center' },
  loadingText: { color: '#00f2ff', marginTop: 15, letterSpacing: 2, fontSize: 12 },
  headerContainer: { alignItems: 'center', marginBottom: 40 },
  avatarWrapper: { width: 150, height: 150, justifyContent: 'center', alignItems: 'center' },
  neonRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#00f2ff',
    borderStyle: 'dotted',
    shadowColor: '#00f2ff',
    shadowRadius: 10,
    shadowOpacity: 0.8
  },
  avatar: { width: 140, height: 140, borderRadius: 70 },
  cameraBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#00f2ff',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000'
  },
  userNick: { color: '#fff', fontSize: 30, fontWeight: '900', letterSpacing: 2, marginTop: 20, textShadowColor: '#00f2ff', textShadowRadius: 10 },
  userStatus: { color: '#50fa7b', fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginTop: 5 },
  infoContainer: { width: '100%', marginTop: 10 },
  dataBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#00f2ff'
  },
  emailBox: { borderLeftColor: '#ff79c6', backgroundColor: 'rgba(255, 121, 198, 0.05)' },
  label: { color: '#00f2ff', fontSize: 10, fontWeight: 'bold', letterSpacing: 1.5, marginBottom: 4 },
  value: { color: '#fff', fontSize: 16, fontWeight: '500' },
  logoutButton: {
    marginTop: 30,
    width: '100%',
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff5555',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 85, 85, 0.1)'
  },
  logoutText: { color: '#ff5555', fontWeight: 'bold', letterSpacing: 1.5, fontSize: 13 }
})