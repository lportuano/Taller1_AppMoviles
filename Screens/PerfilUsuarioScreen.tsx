import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

export default function PerfilUsuarioScreen({ navigation }: any) {
  return (
    <ImageBackground 
      source={{ uri: "https://www.xtrafondos.com/thumbs/vertical/webp/1_13421.webp" }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* SECCIÓN AVATAR */}
          <View style={styles.headerContainer}>
            <View style={styles.avatarWrapper}>
              <View style={styles.neonRing} />
              <Image 
                source={{ uri: "https://www.xtrafondos.com/wallpapers/resized/el-batman-oscuro-7362.jpg?s=large" }} 
                style={styles.avatar}
              />
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>99</Text>
              </View>
            </View>
            <Text style={styles.userName}>NoobMaster69</Text>
            <Text style={styles.userStatus}>ONLINE</Text>
          </View>

          {/* ESTADÍSTICAS VISUALES */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>LOGROS</Text>
            </View>
            <View style={[styles.statBox, styles.statBoxActive]}>
              <Text style={[styles.statNumber, {color: '#50fa7b'}]}>0</Text>
              <Text style={styles.statLabel}>PUNTOS</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>RANGO</Text>
            </View>
          </View>

          {/* BARRA DE PROGRESO DE DISEÑO */}
          <View style={styles.progressSection}>
            <View style={styles.labelRow}>
              <Text style={styles.progressTitle}>ENERGÍA DEL SISTEMA</Text>
              <Text style={styles.progressValue}>85%</Text>
            </View>
            <View style={styles.progressBarEmpty}>
              <View style={styles.progressBarFill} />
            </View>
          </View>

          {/* BOTONES DE MENÚ ESTILIZADOS */}
          <View style={styles.menuWrapper}>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuButtonText}>INVENTARIO</Text>
              <View style={styles.buttonDot} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuButtonText}>HABILIDADES</Text>
              <View style={styles.buttonDot} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuButtonText}>LOGROS DE MISIÓN</Text>
              <View style={styles.buttonDot} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuButton, styles.exitButton]}
            onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.menuButtonText, {color: '#ff5555'}]}>ABANDONAR PARTIDA</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  scrollContent: {
    padding: 25,
    paddingTop: 50,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  neonRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#00f2ff',
    borderStyle: 'dashed',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#1a1a2e',
  },
  levelBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#6200ee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00f2ff',
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
  },
  userStatus: {
    color: '#50fa7b',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 4,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  statBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  statBoxActive: {
    borderColor: '#00f2ff',
    borderBottomColor: '#00f2ff',
    backgroundColor: 'rgba(0,242,255,0.05)',
  },
  statNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    marginTop: 5,
  },
  progressSection: {
    marginBottom: 40,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressTitle: {
    color: '#ff79c6',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressValue: {
    color: '#fff',
    fontSize: 12,
  },
  progressBarEmpty: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  progressBarFill: {
    width: '85%',
    height: '100%',
    backgroundColor: '#ff79c6',
    borderRadius: 4,
  },
  menuWrapper: {
    gap: 15,
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    borderRadius: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#00f2ff',
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 14,
  },
  buttonDot: {
    width: 8,
    height: 8,
    backgroundColor: '#00f2ff',
    borderRadius: 4,
  },
  exitButton: {
    borderLeftColor: '#ff5555',
    marginTop: 20,
    backgroundColor: 'rgba(255, 85, 85, 0.05)',
  }
})