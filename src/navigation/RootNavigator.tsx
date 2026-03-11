import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  AuthStack  from './AuthStack';
import { AppTabs } from './AppTabs';

import { ShareModal } from '../screens/shared/ShareModal';
import { WelcomeScreen } from '../screens/splash/WelcomeScreen';
// import AccountCreated from '../components/specific/AccountCreated';
import ServiceDetail from '../screens/services/ServiceDetail';
import OnlineSession from '../screens/consultation/OnlineSession';
import BookingCalendar from '../screens/booking/BookingCalendar';
import AddProfile from '../screens/user/AddProfile';
import OrderDetail from '../screens/user/OrderDetail';
import Transactions from '../screens/transactions/Transactions';
import Contact from '../screens/contact/Contact';
import About from '../screens/about/About';
import Invoice from '../screens/invoice/Invoice';
import Assessment from '../screens/assessment/Assessment';
import FAQ from '../screens/faq/FAQ';

export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  Main: { screen?: string } | undefined;
  Share: undefined;
  VerifyOTP: { email?: string ,password?: string} | undefined; 
  AccountCreated :{ otpString?: string } | undefined;
  ServiceDetail: { serviceId: number };
  OnlineSession: { consultationId: number };
  BookingCalendar: { serviceId: number };
  AddProfile: undefined;
  OrderDetail: { orderId: number };
  Profile: undefined;
  Transactions: undefined;
  Contact: undefined;
  About: undefined;
  Invoice: undefined;
  Assessment: undefined;
  FAQ: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator  initialRouteName="Welcome"
    screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Main" component={AppTabs} />
      <Stack.Screen name="Share" component={ShareModal} options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }} />
      {/* <Stack.Screen name="AccountCreated" component={AccountCreated}/> */}
      <Stack.Screen name="ServiceDetail" component={ServiceDetail}/>
      <Stack.Screen name="OnlineSession" component={OnlineSession}/>
      <Stack.Screen name="BookingCalendar" component={BookingCalendar}/>
      <Stack.Screen name="AddProfile" component={AddProfile}/>
      <Stack.Screen name="OrderDetail" component={OrderDetail}/>
      <Stack.Screen name="Transactions" component={Transactions}/>
      <Stack.Screen name="Contact" component={Contact}/>
      <Stack.Screen name="About" component={About}/>
      <Stack.Screen name="Invoice" component={Invoice}/>
      <Stack.Screen name="Assessment" component={Assessment}/>
      <Stack.Screen name="FAQ" component={FAQ}/>
    </Stack.Navigator>
  );
};
