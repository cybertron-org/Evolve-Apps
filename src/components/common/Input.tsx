// src/components/common/Input.tsx
import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface Props extends TextInputProps {
  className?: string;
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;  
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<TextInput, Props>(({
  className = '',
  label,
  error,
  leftIcon,
  rightIcon,
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

      {leftIcon || rightIcon ? (
        <View
          className={`
            flex-row ${props.multiline ? 'items-start' : 'items-center'}
            bg-surface dark:bg-surface-dark
            border rounded-md px-4
            ${borderColorClass}
          `}
        >
          {/* Left Icon */}
          {leftIcon && (
            <View className={`mr-3 opacity-60 ${props.multiline ? 'mt-4' : ''}`}>
              {leftIcon}
            </View>
          )}

          {/* Input */}
          <TextInput
            ref={ref}
            className={`flex-1 ${props.multiline ? 'pt-4 pb-4' : 'py-5'} text-label dark:text-label-dark ${className}`}
            placeholderTextColor={isDark ? '#c1c6cf' : '#9CA3AF'}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <View className={`ml-3 opacity-100 ${props.multiline ? 'mt-4' : ''}`}>
              {rightIcon}
            </View>
          )}
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