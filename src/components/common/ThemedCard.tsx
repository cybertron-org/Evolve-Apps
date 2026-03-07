// src/components/common/ThemedCard.tsx
import React from 'react';
import { View, ViewProps, Platform } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export const ThemedCard: React.FC<ViewProps> = ({
  className = '',
  style,
  ...props
}) => {
  const { isDark } = useTheme();

  return (
    <View
      className={`
        bg-card dark:bg-card-dark
        rounded-2xl border border-border dark:border-border-dark
        p-4 ${className}
      `}
      style={[
        Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOpacity: isDark ? 0.4 : 0.08,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
          },
          android: {
            elevation: isDark ? 4 : 2,
          },
        }),
        style,
      ]}
      {...props}
    />
  );
};