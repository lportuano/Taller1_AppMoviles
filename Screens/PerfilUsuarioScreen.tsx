import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, Alert, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config'
import * as SecureStore from 'expo-secure-store'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'

// --- PASO 1: IMPORTAR EXPO-FONT ---
import { useFonts } from 'expo-font';

import Card from '../components/Card'

export default function PerfilUsuarioScreen({ navigation }: any) {
  const [perfil, setPerfil] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)


  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState<any>({
    usuario: '',
    nick: '',
    pais: '',
    genero: ''
  })

  // --- PASO 2: CARGAR LA FUENTE ---
  const [fontsLoaded] = useFonts({
    'GowFont': require('../assets/fonts/gow.ttf'),
  });

  useEffect(() => {
    traerDatos();
  }, [])

  async function traerDatos() {
    try {
      setLoading(true)
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError) {
        await SecureStore.deleteItemAsync("token");
        navigation.navigate("Welcome");
        return;
      }

      if (user) {
        const { data, error } = await supabase
          .from('registroUsuario')
          .select('usuario, nick, email, pais, genero, avatar')
          .eq('id', user.id)
          .maybeSingle()

        if (data) {
          setPerfil(data)
          setForm(data)
          if (data.avatar) setImage(data.avatar);
        }
      }
    } catch (error) {
      console.error("Error al cargar perfil:", error);
    } finally {
      setLoading(false)
    }
  }

  async function actualizarPerfil() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('registroUsuario')
        .update({
          usuario: form.usuario,
          nick: form.nick,
          pais: form.pais,
          genero: form.genero
        })
        .eq('id', user?.id);

      if (error) throw error;

      setPerfil(form);
      setEditando(false);
      Alert.alert("Sistema", "¡Datos del jugador actualizados!");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function subirImagen(uriSeleccionada: string) {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;
      const idUnico = Date.now();
      const pathImg = `${userId}/avatar_${idUnico}.png`;

      const response = await fetch(uriSeleccionada);
      const matrizBits = await response.arrayBuffer();

      const { error: errorSubida } = await supabase.storage
        .from('jugadores')
        .upload(pathImg, matrizBits, { contentType: "image/png", upsert: true });

      if (errorSubida) throw errorSubida;

      const { data: urlData } = supabase.storage.from('jugadores').getPublicUrl(pathImg);
      const urlPublica = urlData.publicUrl;

      await supabase.from('registroUsuario').update({ avatar: urlPublica }).eq('id', userId);

      setImage(urlPublica);
      Alert.alert("Éxito", "Imagen de perfil actualizada.");
    } catch (error: any) {
      Alert.alert("Error", "No se pudo subir la imagen.");
    } finally {
      setLoading(false);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.5,
    });
    if (!result.canceled) { setModalVisible(false); subirImagen(result.assets[0].uri); }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.5,
    });
    if (!result.canceled) { setModalVisible(false); subirImagen(result.assets[0].uri); }
  };

  async function cerrarSesion() {
    await supabase.auth.signOut()
    await SecureStore.deleteItemAsync("token")
    navigation.navigate("Welcome");
  }

  // Prevenir renderizado sin fuentes
  if (!fontsLoaded || loading) {
    return (
      <View style={[styles.container, { backgroundColor: '#000', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#00f2ff" />
        <Text style={styles.loadingText}>SINCRONIZANDO...</Text>
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
              onPress={() => editando && setModalVisible(true)}
              activeOpacity={editando ? 0.8 : 1}
            >
              <View style={[styles.neonRing, editando && { borderColor: '#50fa7b' }]} />
              <Image
                source={{ uri: image || "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" }}
                style={styles.avatar}
              />
              {editando && (
                <View style={styles.cameraBadge}>
                  <Ionicons name="camera" size={16} color="#000" />
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.userNick}>{perfil?.nick || 'SIN GAMERTAG'}</Text>

            <TouchableOpacity
              style={[styles.editBtn, editando && styles.saveBtnActive]}
              onPress={() => editando ? actualizarPerfil() : setEditando(true)}
            >
              <Text style={[styles.editBtnText, editando && { color: '#50fa7b' }]}>
                {editando ? "GUARDAR CAMBIOS" : "EDITAR PERFIL"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            {[
              { label: 'NOMBRE REAL', key: 'usuario' },
              { label: 'GAMERTAG / NICK', key: 'nick' },
              { label: 'PAÍS', key: 'pais' },
              { label: 'GÉNERO', key: 'genero' }
            ].map((item) => (
              <View key={item.key} style={styles.dataBox}>
                <Text style={styles.label}>{item.label}</Text>
                {editando ? (
                  <TextInput
                    style={styles.input}
                    value={form[item.key]}
                    onChangeText={(txt) => setForm({ ...form, [item.key]: txt })}
                    placeholderTextColor="#666"
                  />
                ) : (
                  <Text style={styles.value}>{perfil?.[item.key] || 'No registrado'}</Text>
                )}
              </View>
            ))}

            <View style={[styles.dataBox, styles.emailBox]}>
              <Text style={[styles.label, { color: '#ff79c6' }]}>CORREO ELECTRÓNICO</Text>
              <Text style={styles.value}>{perfil?.email || 'Desconocido'}</Text>
            </View>
          </View>

          {editando && (
            <TouchableOpacity style={styles.cancelBtn} onPress={() => { setEditando(false); setForm(perfil); }}>
              <Text style={styles.cancelBtnText}>CANCELAR CAMBIOS</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.logoutButton} onPress={() => cerrarSesion()}>
            <Text style={styles.logoutText}>CERRAR SESION</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.88)'
  },

  scrollContent: {
    padding: 25,
    paddingTop: 60,
    paddingBottom: 50,
    alignItems: 'center'
  },

  loadingText: {
    fontFamily: 'GowFont',
    color: '#00f2ff',
    marginTop: 15,
    letterSpacing: 1,
    fontSize: 10
  },

  headerContainer: {
    alignItems: 'center',
    marginBottom: 40
  },

  avatarWrapper: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },

  neonRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#00f2ff',
    borderStyle: 'solid',
    shadowColor: '#00f2ff',
    shadowRadius: 15,
    shadowOpacity: 0.9
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70
  },

  cameraBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#50fa7b',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000'
  },

  userNick: {
    fontFamily: 'GowFont',
    color: '#fff',
    fontSize: 22,
    marginTop: 25,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowRadius: 10
  },

  infoContainer: {
    width: '100%',
    marginTop: 10
  },

  dataBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#00f2ff'
  },

  emailBox: {
    borderLeftColor: '#ff79c6',
    backgroundColor: 'rgba(255, 121, 198, 0.05)'
  },

  label: {
    fontFamily: 'GowFont',
    color: '#00f2ff',
    fontSize: 9,
    letterSpacing: 1,
    marginBottom: 6
  },

  value: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500'
  },

  input: {
    color: '#fff',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#00f2ff55',
    paddingVertical: 5
  },

  editBtn: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#00f2ff',
    backgroundColor: 'rgba(0, 242, 255, 0.05)'
  },

  saveBtnActive: {
    borderColor: '#50fa7b',
    backgroundColor: 'rgba(80, 250, 123, 0.1)'
  },

  editBtnText: {
    fontFamily: 'GowFont',
    color: '#00f2ff',
    fontSize: 10,
    letterSpacing: 1
  },

  cancelBtn: {
    marginTop: 20
  },

  cancelBtnText: {
    fontFamily: 'GowFont',
    color: '#666',
    fontSize: 9,
    letterSpacing: 1
  },

  logoutButton: {
    marginTop: 40,
    width: '100%',
    height: 55,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ff5555',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 85, 85, 0.1)'
  },

  logoutText: {
    fontFamily: 'GowFont',
    color: '#ff5555',
    fontSize: 12,
    letterSpacing: 1
  }
})