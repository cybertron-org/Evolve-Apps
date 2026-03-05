import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from './AuthStack';
import { AppTabs } from './AppTabs';
import { EditorScreen } from '../screens/editor/EditorScreen';
import { PlayerScreen } from '../screens/editor/PlayerScreen';
import { ShareModal } from '../screens/shared/ShareModal';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 
        This is a simplified approach. In a real app, you'd likely check auth state
        and conditionally render AuthStack or AppTabs.
        For now, we start with AuthStack and navigate to AppTabs on login.
      */}
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Main" component={AppTabs} />
      <Stack.Screen name="Editor" component={EditorScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="Player" component={PlayerScreen} options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
      <Stack.Screen name="Share" component={ShareModal} options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }} />
    </Stack.Navigator>
  );
};
