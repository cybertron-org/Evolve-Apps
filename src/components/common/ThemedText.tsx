// src/components/common/ThemedText.tsx
import React from 'react';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const ThemedText: React.FC<Props> = ({
  variant = 'primary',
  className = '',
  style,
  ...props
}) => {
  const variantClass = {
    primary: 'text-label dark:text-label-dark',
    secondary: 'text-sublabel dark:text-sublabel-dark',
  }[variant];

  return (
    <Text
      className={`${variantClass} ${className}`}
      style={style}
      {...props}
    />
  );
};