import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

export const EditorScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header / Toolbar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Untitled Presentation</Text>
        <TouchableOpacity 
          style={styles.playButton}
          onPress={() => navigation.navigate('Player' as never)}
        >
          <Text style={styles.playIcon}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Main Canvas */}
      <View style={styles.canvasContainer}>
        <View style={styles.canvas}>
          <Text style={styles.placeholderText}>Double tap to add title</Text>
        </View>
      </View>

      {/* Bottom Toolbar */}
      <View style={styles.toolbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tools}>
          {['T', 'Img', 'Shp', 'Col', 'Ani'].map((tool, index) => (
            <TouchableOpacity key={index} style={styles.toolItem}>
              <Text style={styles.toolText}>{tool}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Slide Thumbnails */}
      <View style={styles.thumbnails}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map((item, index) => (
            <View key={index} style={[styles.thumbnail, index === 0 && styles.activeThumbnail]}>
              <Text style={styles.slideNumber}>{index + 1}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addSlide}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: 10,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: colors.text.light,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  playButton: {
    padding: 8,
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#fff',
    fontSize: 12,
  },
  canvasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  canvas: {
    width: width * 0.8,
    aspectRatio: 16 / 9,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.text.muted,
    fontSize: 18,
  },
  toolbar: {
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tools: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  toolItem: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.input.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  toolText: {
    fontWeight: 'bold',
    color: colors.text.light,
  },
  thumbnails: {
    height: 100,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 10,
  },
  thumbnail: {
    width: 120,
    height: 70,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: colors.primary,
  },
  slideNumber: {
    color: colors.text.muted,
  },
  addSlide: {
    width: 120,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  addText: {
    fontSize: 24,
    color: colors.text.muted,
  },
});
