// src/components/common/ThemedView.tsx
import React from 'react';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  variant?: 'background' | 'surface' | 'card';
  className?: string;
}

export const ThemedView: React.FC<Props> = ({
  variant = 'background',
  className = '',
  style,
  ...props
}) => {
  const variantClass = {
    background: 'bg-background dark:bg-background-dark',
    surface:    'bg-surface dark:bg-surface-dark',
    card:       'bg-card dark:bg-card-dark',
  }[variant];

  return (
    <View
      className={`${variantClass} ${className}`}
      style={style}
      {...props}
    />
  );
};