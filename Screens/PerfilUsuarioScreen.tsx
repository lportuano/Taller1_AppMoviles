import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config'

export default function PerfilUsuarioScreen({ navigation }: any) {
  const [perfil, setPerfil] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    traerDatos();
  }, [])

  async function traerDatos() {
    try {
      setLoading(true)
      
      // 1. Obtener el usuario actual de la autenticación
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError) throw authError;

      if (user) {
        // 2. Consultar tu tabla real 'registroUsuarios'
        const { data, error: dbError } = await supabase
          .from('registroUsuarios')
          .select('usuario, nick, email, pais, genero')
          .eq('id', user.id)
          .maybeSingle() // Evita errores si la fila aún no existe

        if (dbError) throw dbError;

        if (data) {
          setPerfil(data)
        } else {
          console.log("No se encontraron datos extra para este ID en la tabla.");
        }
      }
    } catch (error: any) {
      console.error("Error al sincronizar perfil:", error.message)
      Alert.alert("Error de Conexión", "No se pudo obtener la información del servidor.")
    } finally {
      setLoading(false)
    }
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
          
          {/* CABECERA CON AVATAR DE BATMAN */}
          <View style={styles.headerContainer}>
            <View style={styles.avatarWrapper}>
              <View style={styles.neonRing} />
              <Image 
                source={{ uri: "https://www.xtrafondos.com/wallpapers/resized/el-batman-oscuro-7362.jpg?s=large" }} 
                style={styles.avatar}
              />
            </View>
            <Text style={styles.userNick}>{perfil?.nick?.toUpperCase() || 'SIN GAMERTAG'}</Text>
            <Text style={styles.userStatus}>JUGADOR ONLINE</Text>
          </View>

          {/* CONTENEDORES DE INFORMACIÓN REAL */}
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

          {/* BOTÓN SALIR */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.logoutText}>SALIR AL MENÚ PRINCIPAL</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </ImageBackground>
  )
}

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