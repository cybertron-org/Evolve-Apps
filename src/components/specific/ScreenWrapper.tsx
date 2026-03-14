import React from 'react';
import { View, ViewProps, ScrollView, ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props extends ViewProps {
  children: React.ReactNode;
  safe?: boolean;
  scroll?: boolean;
  scrollViewProps?: ScrollViewProps;
  className?: string;
}

export const ScreenWrapper: React.FC<Props> = ({
  children,
  safe = true,
  scroll = false,
  scrollViewProps,
  className = '',
  style,
  ...props
}) => {
  const content = scroll ? (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  if (safe) {
    return (
      <SafeAreaView
        className={`flex-1 bg-background dark:bg-background-dark ${className}`}
        style={style}
        {...props}>
        {content}
      </SafeAreaView>
    );
  }

  return (
    <View
      className={`flex-1 bg-background dark:bg-background-dark ${className}`}
      style={style}
      {...props}>
      {content}
    </View>
  );
};