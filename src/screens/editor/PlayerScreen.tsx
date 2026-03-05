import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

export const PlayerScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeIcon}>✕</Text>
      </TouchableOpacity>

      <View style={styles.slide}>
        <Text style={styles.title}>Presentation Title</Text>
        <Text style={styles.content}>Swipe to navigate</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}><Text style={styles.controlText}>←</Text></TouchableOpacity>
        <Text style={styles.pageNumber}>1 / 10</Text>
        <TouchableOpacity style={styles.controlButton}><Text style={styles.controlText}>→</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  closeIcon: {
    color: '#fff',
    fontSize: 24,
  },
  slide: {
    width: width,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  controlButton: {
    padding: 20,
  },
  controlText: {
    color: '#fff',
    fontSize: 24,
  },
  pageNumber: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 20,
  },
});
