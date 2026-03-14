import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import { AppTabs } from './AppTabs';

import { WelcomeScreen } from '../screens/splash/WelcomeScreen';
import OnlineSession from '../screens/consultation/OnlineSession';
import AddProfile from '../screens/user/AddProfile';
import DoubleClickToPay from '../screens/payment/DoubleClickToPay';
import PurchaseSummary from '../screens/payment/PurchaseSummary';
import PaymentSuccess from '../screens/payment/PaymentSuccess';
import PaymentFailed from '../screens/payment/PaymentFailed';
import SessionExpired from '../screens/session/SessionExpired';
import SessionCompleted from '../screens/session/SessionCompleted';
import ChatDetail from '../screens/messages/ChatDetail';

export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  Main: { screen?: string; params?: any } | undefined;
  Home: { screen?: string; params?: any } | undefined;
  Messages: { screen?: string; params?: any } | undefined;
  Services: { screen?: string; params?: any } | undefined;
  History: { screen?: string; params?: any } | undefined;
  Profile: { screen?: string; params?: any } | undefined;
  OnlineSession: { consultationId: number };
  AddProfile: undefined;
  DoubleClickToPay: undefined;
  VerifyOTP:{ email?: string } | undefined;
  // Nested screens available via navigation
  ServiceDetail: { serviceId: number };
  ConsultationList: undefined;
  BookingCalendar: { serviceId: number };
  Transactions: undefined;
  Contact: undefined;
  About: undefined;
  Invoice: undefined;
  PayslipDetail: { month: string; year: string };
  Assessment: undefined;
  FAQ: undefined;
  CoachProfile: undefined;
  PurchaseSummary: { serviceId?: number } | undefined;
  PaymentInProcess: undefined;
  PaymentSuccess: { type?: 'session' | 'rejoin' } | undefined;
  PaymentFailed: undefined;
  SessionExpired: undefined;
  SessionCompleted: { type?: 'invoice' | 'assessment' } | undefined;
  ChatDetail: { id: number; name: string; role: string; avatar: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Main" component={AppTabs} />
      <Stack.Screen name="OnlineSession" component={OnlineSession} />
      <Stack.Screen name="AddProfile" component={AddProfile} />
      <Stack.Screen name="DoubleClickToPay" component={DoubleClickToPay} options={{ animation: 'fade' }} />
      <Stack.Screen name="ChatDetail" component={ChatDetail} />
      <Stack.Screen name="PurchaseSummary" component={PurchaseSummary} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
      <Stack.Screen name="PaymentFailed" component={PaymentFailed} />
      <Stack.Screen name="SessionExpired" component={SessionExpired} />
      <Stack.Screen name="SessionCompleted" component={SessionCompleted} />
    </Stack.Navigator>
  );
};
