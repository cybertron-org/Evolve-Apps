import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import GlobalIcon from '../components/common/GlobalIcon';
import Home from '../screens/home/Home';
import Messages from '../screens/messages/Messages';
import Services from '../screens/services/Services';
import History from '../screens/history/History';
import Profile from '../screens/user/Profile';

const Tab = createBottomTabNavigator();

export const AppTabs = () => {
  const { isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#578096',
        tabBarInactiveTintColor: isDark ? '#94A3B8' : '#9CA3AF',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
          borderTopColor: isDark ? '#374151' : '#E5E7EB',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 100 : 100,
          paddingBottom: Platform.OS === 'ios' ? 30 : 15,
          paddingTop: 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: -2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ focused, color }) => (
            <GlobalIcon 
              name="home" 
              library="Feather" 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={Messages}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <GlobalIcon 
              name="message-circle" 
              library="Feather" 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Services" 
        component={Services}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <GlobalIcon 
              name="grid" 
              library="Feather" 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="History" 
        component={History}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <GlobalIcon 
              name="clock" 
              library="Feather" 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <GlobalIcon 
              name="user" 
              library="Feather" 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
