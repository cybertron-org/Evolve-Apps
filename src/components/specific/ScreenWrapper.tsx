import React from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props extends ViewProps {
  children: React.ReactNode;
  safe?: boolean;       
  className?: string;
}

export const ScreenWrapper: React.FC<Props> = ({
  children,
  safe = true,
  className = '',
  style,
  ...props
}) => {
  if (safe) {
    return (
      <SafeAreaView
        className={`flex-1 bg-background dark:bg-background-dark ${className}`}
        style={style}
        {...props}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View
      className={`flex-1 bg-background dark:bg-background-dark ${className}`}
      style={style}
      {...props}>
      {children}
    </View>
  );
};