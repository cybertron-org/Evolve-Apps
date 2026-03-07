// src/components/common/Input.tsx
import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface Props extends TextInputProps {
  className?: string;
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;  // ✅ new prop
}

const Input = forwardRef<TextInput, Props>(({
  className = '',
  label,
  error,
  leftIcon,
  ...props
}, ref) => {
  const { isDark } = useTheme();

  const labelColorClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const borderColorClass = error
    ? 'border-red-500'
    : isDark
      ? 'border-gray-700'
      : 'border-gray-200';

  return (
    <View className="mb-4 w-full">
      {label && (
        <Text className={`text-sm font-medium mb-2 ml-1 ${labelColorClass}`}>
          {label}
        </Text>
      )}

      {/* ✅ icon hai toh wrapper, nahi toh direct TextInput */}
      {leftIcon ? (
        <View
          className={`
            flex-row items-center
            bg-surface dark:bg-surface-dark
            border rounded-md px-4
            ${borderColorClass}
          `}
        >
          {/* Icon */}
          <View className="mr-3 opacity-60">
            {leftIcon}
          </View>

          {/* Input */}
          <TextInput
            ref={ref}
            className={`flex-1 py-5 text-label dark:text-label-dark ${className}`}
            placeholderTextColor={isDark ? '#c1c6cf' : '#9CA3AF'}
            {...props}
          />
        </View>
      ) : (
        <TextInput
          ref={ref}
          className={`
            bg-surface dark:bg-surface-dark
            text-label dark:text-label-dark
            border rounded-md px-6 py-5
            ${borderColorClass}
            ${className}
          `}
          placeholderTextColor={isDark ? '#c1c6cf' : '#9CA3AF'}
          {...props}
        />
      )}

      {error && (
        <Text className="text-xs mt-1 ml-1 text-red-500">
          {error}
        </Text>
      )}
    </View>
  );
});

export default Input;