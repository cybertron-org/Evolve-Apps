import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { Input } from '../../components/common/Input';

// Mock Data
const RECENT_FILES = [
  { id: '1', title: 'Strategy Deck', date: 'Edited 2h ago', thumbnail: 'https://placeholder.com/150' },
  { id: '2', title: 'Q4 Report', date: 'Edited 5h ago', thumbnail: 'https://placeholder.com/150' },
  { id: '3', title: 'Design System', date: 'Edited 1d ago', thumbnail: 'https://placeholder.com/150' },
];


const FOLDERS = [
  { id: '1', name: 'Marketing Strategy', count: 12 },
  { id: '2', name: 'Product Launch', count: 8 },
  { id: '3', name: 'Design Assets', count: 24 },
  { id: '4', name: 'Personal', count: 5 },
];


export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const renderRecentItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.recentItem}
      onPress={() => navigation.navigate('Editor', { fileId: item.id })}
    >
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      </View>
      <View style={styles.fileInfo}>
        <Text style={styles.fileTitle}>{item.title}</Text>
        <Text style={styles.fileDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFolderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.folderItem}>
      <View style={styles.folderIcon}>
        {/* Icon placeholder */}
        <View style={styles.iconPlaceholder} />
      </View>
      <View style={styles.folderInfo}>
        <Text style={styles.folderName}>{item.name}</Text>
        <Text style={styles.folderCount}>{item.count} files</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome Back!</Text>
        <View style={styles.avatar} />
      </View>

      <View style={styles.searchContainer}>
        <Input placeholder="Search presentations..." />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Files</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Files' as never)}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={RECENT_FILES}
            renderItem={renderRecentItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentList}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Folders</Text>
          <FlatList
            data={FOLDERS}
            renderItem={renderFolderItem}
            keyExtractor={item => item.id}
            scrollEnabled={false} // Use ScrollView for scrolling
            contentContainerStyle={styles.folderList}
          />
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('Editor', { new: true })}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
    paddingTop: 60, // Adjust for status bar
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.light,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  searchContainer: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.light,
    marginBottom: 12,
  },
  seeAll: {
    color: colors.primary,
    fontWeight: '600',
  },
  recentList: {
    paddingRight: 20,
  },
  recentItem: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
  },
  thumbnailContainer: {
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fileInfo: {
    justifyContent: 'center',
  },
  fileTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.light,
    marginBottom: 4,
  },
  fileDate: {
    fontSize: 12,
    color: colors.text.muted,
  },
  folderList: {
    paddingBottom: 20,
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  folderIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.input.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    backgroundColor: colors.primary,
    opacity: 0.5,
    borderRadius: 4,
  },
  folderInfo: {
    flex: 1,
  },
  folderName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.light,
  },
  folderCount: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 32,
    color: '#fff',
    lineHeight: 32,
  },
});
