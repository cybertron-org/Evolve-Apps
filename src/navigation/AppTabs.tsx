import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import GlobalIcon from '../components/common/GlobalIcon';
import Home from '../screens/home/Home';
import Messages from '../screens/messages/Messages';
import Services from '../screens/services/Services';
import History from '../screens/history/History';
import Profile from '../screens/user/Profile';
import ServicesSvg from '../assets/svg/service';
import { HomeSvg , MessageSvg , HistorySvg , ProfileSvg} from '../assets/svg';


const Tab = createBottomTabNavigator();

export const AppTabs = () => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  // Calculate tab bar height based on safe area insets
  const getTabBarHeight = () => {
    if (Platform.OS === 'ios') {
      // iOS: Account for home indicator
      return insets.bottom > 0 ? 65 + insets.bottom : 75;
    } else {
      // Android: Account for gesture navigation vs 3-button navigation
      // Gesture navigation typically has insets.bottom > 0
      // 3-button navigation has insets.bottom === 0
      return insets.bottom > 0 ? 70 + insets.bottom : 70;
    }
  };

  const getPaddingBottom = () => {
    if (Platform.OS === 'ios') {
      return insets.bottom > 0 ? insets.bottom + 5 : 10;
    } else {
      // Android: Add extra padding for gesture navigation
      return insets.bottom > 0 ? insets.bottom + 8 : 12;
    }
  };

  const getBottomPosition = () => {
    // Add margin from bottom for gesture navigation
    if (Platform.OS === 'android' && insets.bottom > 0) {
      return 8; // 8px gap from bottom for gesture bar
    }
    return 0;
  };

  const tabBarHeight = getTabBarHeight();
  const paddingBottom = getPaddingBottom();
  const bottomPosition = getBottomPosition();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#578096',
        tabBarInactiveTintColor: isDark ? '#94A3B8' : '#9CA3AF',
        tabBarStyle: {
          position: 'absolute',
          bottom: bottomPosition,
          left: 8,
          right: 8,
          backgroundColor: isDark ? '#28282A' : '#FFFFFF',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderBottomLeftRadius: bottomPosition > 0 ? 24 : 0,
          borderBottomRightRadius: bottomPosition > 0 ? 24 : 0,
          borderTopColor: 'transparent',
          borderTopWidth: 0,
          height: tabBarHeight,
          paddingBottom: paddingBottom,
          paddingTop: 12,
          paddingHorizontal: 8,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ focused, color }) => (
            <HomeSvg 
              color={focused ? '#578096' : (isDark ? '#94A3B8' : '#9CA3AF')} 
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={Messages}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MessageSvg 
              color={focused ? '#578096' : (isDark ? '#94A3B8' : '#9CA3AF')} 
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Services" 
        component={Services}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <ServicesSvg 
              color={focused ? '#578096' : (isDark ? '#94A3B8' : '#9CA3AF')} 
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="History" 
        component={History}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <HistorySvg 
              color={focused ? '#578096' : (isDark ? '#94A3B8' : '#9CA3AF')} 
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <ProfileSvg 
              color={focused ? '#578096' : (isDark ? '#94A3B8' : '#9CA3AF')} 
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
