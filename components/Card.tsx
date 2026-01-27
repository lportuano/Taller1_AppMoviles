import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CardProps {
    visible: boolean;
    onClose: () => void;
    onCamera: () => void;
    onGallery: () => void;
}

export default function Card({ visible, onClose, onCamera, onGallery }: CardProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>ACTUALIZAR AVATAR</Text>

                    <View style={styles.modalButtonsRow}>
                        <TouchableOpacity style={styles.modalOption} onPress={onCamera}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="camera" size={32} color="#00f2ff" />
                            </View>
                            <Text style={styles.modalOptionText}>CÁMARA</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalOption} onPress={onGallery}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="images" size={32} color="#00f2ff" />
                            </View>
                            <Text style={styles.modalOptionText}>GALERÍA</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelButtonText}>CANCELAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#121212',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00f2ff',
        elevation: 20,
        shadowColor: '#00f2ff',
        shadowRadius: 20,
        shadowOpacity: 0.4
    },
    modalTitle: {
        color: '#00f2ff',
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 30,
        letterSpacing: 2
    },
    modalButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 25
    },
    modalOption: {
        alignItems: 'center'
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(0, 242, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00f2ff',
        marginBottom: 12
    },
    modalOptionText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    cancelButton: {
        marginTop: 10,
        padding: 10
    },
    cancelButtonText: {
        color: '#ff5555',
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 12
    }
});