// App.tsx
import React, { useEffect, useState } from 'react';
import { StatusBar, Platform, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { withStallion } from 'react-native-stallion';
import { createMMKV } from 'react-native-mmkv';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { ToastProvider } from './src/hooks/useToast';
import Toast from './src/components/common/Toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const storage = createMMKV();

const NAVIGATION_STATE_KEY = 'NAVIGATION_STATE';

function AppContent(): React.JSX.Element {
  const { isDark } = useTheme();
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = storage.getString(NAVIGATION_STATE_KEY);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        
        if (state !== undefined) {
          // Function to get current route name for logging
          const getCurrentRoute = (navState: any): string | undefined => {
            if (!navState || !navState.routes) return undefined;
            const route = navState.routes[navState.index];
            if (route.state) {
              return getCurrentRoute(route.state);
            }
            return route.name;
          };
          
          const currentRoute = getCurrentRoute(state);
          console.log("User was on screen:", currentRoute);
          
          setInitialState(state);
        }
      } catch (e) {
        console.log('Failed to restore navigation state:', e);
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDark ? '#0F172A' : '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#578096" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#0F172A' : '#FFFFFF'}
        translucent={Platform.OS === 'android' ? false : undefined}
      />
      <ToastProvider>
        <NavigationContainer
          initialState={initialState}
          onStateChange={(state) => {
            try {
              // Log current navigation state
              const getCurrentRoute = (navState: any): string => {
                if (!navState || !navState.routes) return 'unknown';
                const route = navState.routes[navState.index];
                if (route.state) {
                  return getCurrentRoute(route.state);
                }
                return route.name;
              };
              
              const currentRoute = getCurrentRoute(state);
              console.log("Current screen:", currentRoute);
              
              storage.set(NAVIGATION_STATE_KEY, JSON.stringify(state));
            } catch (e) {
              console.log('Failed to save navigation state:', e);
            }
          }}
        >
          <RootNavigator />
        </NavigationContainer>
        <Toast />
      </ToastProvider>
    </SafeAreaProvider>
  );
}

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default withStallion(App);