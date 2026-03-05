import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { FilesScreen } from '../screens/home/FilesScreen';
import { colors } from '../theme/colors';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, label }: { focused: boolean; label: string }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ 
      color: focused ? colors.primary : colors.text.muted,
      fontSize: 20,
      marginBottom: 4
    }}>
      {label === 'Home' ? '🏠' : '📂'}
    </Text>
    <Text style={{ 
      color: focused ? colors.primary : colors.text.muted,
      fontSize: 10,
      fontWeight: focused ? '600' : '400'
    }}>
      {label}
    </Text>
  </View>
);

export const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="Home" />,
        }}
      />
      <Tab.Screen 
        name="Files" 
        component={FilesScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="Files" />,
        }}
      />
    </Tab.Navigator>
  );
};
