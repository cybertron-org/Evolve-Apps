import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';

const FILES = [
  { id: '1', name: 'Project Alpha', type: 'deck', size: '2.4 MB', date: '2023-10-24' },
  { id: '2', name: 'Budget 2024', type: 'sheet', size: '1.1 MB', date: '2023-10-22' },
  { id: '3', name: 'Logo Assets', type: 'folder', size: '15 items', date: '2023-10-20' },
  { id: '4', name: 'Q3 Review', type: 'deck', size: '5.6 MB', date: '2023-10-18' },
  { id: '5', name: 'Marketing Plan', type: 'doc', size: '800 KB', date: '2023-10-15' },
];

export const FilesScreen: React.FC = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => navigation.navigate('Editor', { fileId: item.id })}
    >
      <View style={styles.iconContainer}>
        {/* Placeholder for file type icon */}
        <View style={[styles.icon, item.type === 'folder' && styles.folderIcon]} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>{item.date} • {item.size}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreIcon}>•••</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Files</Text>
        <TouchableOpacity>
          <Text style={styles.sortAction}>Sort by: Date</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={FILES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.light,
  },
  sortAction: {
    color: colors.primary,
    fontSize: 14,
  },
  list: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    marginRight: 16,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E0E7FF', // Light purple
  },
  folderIcon: {
    backgroundColor: '#FFE4E6', // Light pink
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.light,
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: colors.text.muted,
  },
  moreButton: {
    padding: 8,
  },
  moreIcon: {
    fontSize: 18,
    color: colors.text.muted,
    transform: [{ rotate: '90deg' }],
  },
});
