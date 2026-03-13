import React from 'react';
import { Text, TextProps } from 'react-native';

interface AppTextProps extends TextProps {
  className?: string;
}

export const AppText: React.FC<AppTextProps> = ({
  className = '',
  style,
  children,
  ...props
}) => {
  return (
    <Text
      className={className}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
};

export default AppText;
