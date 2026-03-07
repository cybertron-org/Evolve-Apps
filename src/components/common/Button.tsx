import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'social';
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  className?: string;
  textClassName?: string; 
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  style,
  textStyle,
  icon,
  className,
  textClassName,
}) => {
  const { isDark } = useTheme();

  const getContainerClass = () => {
    switch (variant) {
      case 'primary':   return 'bg-[#578096]';
      case 'secondary': return 'bg-secondary';
      case 'outline':   return 'border border-primary bg-transparent';
      case 'social':    return isDark ? 'bg-dropdown-dark border border-gray-700' : 'bg-white border border-gray-200';
      default:          return 'bg-primary';
    }
  };

  const getTextClass = () => {
    switch (variant) {
      case 'outline': return 'text-primary';
      case 'social':  return isDark ? 'text-gray-100' : 'text-gray-800';
      default:        return 'text-white';
    }
  };

  const getActivityColor = () => {
    switch (variant) {
      case 'outline': return '#578096';
      case 'social':  return isDark ? '#F1F5F9' : '#1E293B';
      default:        return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity
      className={`
        h-[50px] rounded-[25px] flex-row
        justify-center items-center px-5 my-2
        shadow-sm
        ${getContainerClass()}
        ${loading ? 'opacity-70' : 'opacity-100'}
        ${className ?? ''}
      `}
      style={style}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getActivityColor()} />
      ) : (
        <>
          {icon}
          <Text
            className={`text-base font-semibold ml-2 ${getTextClass()} ${textClassName ?? ''}`}
            style={textStyle}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};