// src/components/common/ThemeToggle.tsx
import React from 'react';
import { View, Text, Switch, Platform } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export const ThemeToggle = () => {
  const { isDark, setThemeMode } = useTheme();

  return (
    <View className="flex-row items-center justify-center px-4 py-3 rounded-2xl">
     
     <Switch
        value={isDark}
        onValueChange={val => setThemeMode(val ? 'dark' : 'light')}
        trackColor={{
          false: '#E5E7EB',
          true: '#9CA3AF', 
        }}
        thumbColor={
          Platform.OS === 'android'
            ? isDark
              ? '#FFFFFF'
              : '#0C213F'
            : undefined
        }
        ios_backgroundColor="#E5E7EB"
      />
    </View>
  );
};