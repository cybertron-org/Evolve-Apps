import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.input.placeholder}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: colors.text.light,
    marginBottom: 6,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.input.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 12,
    height: 50,
  },
  inputError: {
    borderColor: 'red',
  },
  input: {
    flex: 1,
    height: '100%',
    color: colors.text.light,
    fontSize: 16,
  },
  iconContainer: {
    padding: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
