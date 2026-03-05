import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { Button } from '../../components/common/Button';

export const ShareModal: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.title}>Share Presentation</Text>
        
        <View style={styles.section}>
          <Text style={styles.label}>Invite People</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder="Enter email addresses"
              style={styles.input}
              placeholderTextColor={colors.input.placeholder}
            />
            <TouchableOpacity style={styles.inviteButton}>
              <Text style={styles.inviteText}>Invite</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Link Sharing</Text>
          <View style={styles.linkContainer}>
            <Text numberOfLines={1} style={styles.link}>
              https://prezently.app/p/x8s9d0s...
            </Text>
            <TouchableOpacity>
              <Text style={styles.copyText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button 
          title="Done" 
          onPress={() => navigation.goBack()}
          style={styles.doneButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: colors.text.light,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text.light,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: colors.text.light,
  },
  inviteButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  inviteText: {
    color: '#fff',
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.input.background,
    padding: 12,
    borderRadius: 12,
  },
  link: {
    flex: 1,
    color: colors.text.muted,
    marginRight: 10,
  },
  copyText: {
    color: colors.primary,
    fontWeight: '600',
  },
  doneButton: {
    marginTop: 10,
  },
});
