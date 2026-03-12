import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  AuthStack  from './AuthStack';
import { AppTabs } from './AppTabs';

import { ShareModal } from '../screens/shared/ShareModal';
import { WelcomeScreen } from '../screens/splash/WelcomeScreen';
// import AccountCreated from '../components/specific/AccountCreated';
import ServiceDetail from '../screens/services/ServiceDetail';
import OnlineSession from '../screens/consultation/OnlineSession';
import ConsultationList from '../screens/consultation/ConsultationList';
import BookingCalendar from '../screens/booking/BookingCalendar';
import AddProfile from '../screens/user/AddProfile';
import Transactions from '../screens/transactions/Transactions';
import Contact from '../screens/contact/Contact';
import About from '../screens/about/About';
import Invoice from '../screens/invoice/Invoice';
import PayslipDetail from '../screens/invoice/PayslipDetail';
import Assessment from '../screens/assessment/Assessment';
import FAQ from '../screens/faq/FAQ';
import CoachProfile from '../screens/coach/CoachProfile';
// Payment & Session screens
import PurchaseSummary from '../screens/payment/PurchaseSummary';
import DoubleClickToPay from '../screens/payment/DoubleClickToPay';
import PaymentInProcess from '../screens/payment/PaymentInProcess';
import PaymentSuccess from '../screens/payment/PaymentSuccess';
import PaymentFailed from '../screens/payment/PaymentFailed';
import SessionExpired from '../screens/session/SessionExpired';
import SessionCompleted from '../screens/session/SessionCompleted';

export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  Main: { screen?: string } | undefined;
  Share: undefined;
  VerifyOTP: { email?: string ,password?: string} | undefined; 
  AccountCreated :{ otpString?: string } | undefined;
  ServiceDetail: { serviceId: number };
  OnlineSession: { consultationId: number };
  ConsultationList: undefined;
  BookingCalendar: { serviceId: number };
  AddProfile: undefined;
  Profile: undefined;
  Transactions: undefined;
  Contact: undefined;
  About: undefined;
  Invoice: undefined;
  PayslipDetail: { month: string; year: string };
  Assessment: undefined;
  FAQ: undefined;
  CoachProfile: undefined;
  // Payment & Session routes
  PurchaseSummary: { serviceId?: number } | undefined;
  DoubleClickToPay: undefined;
  PaymentInProcess: undefined;
  PaymentSuccess: { type?: 'session' | 'rejoin' } | undefined;
  PaymentFailed: undefined;
  SessionExpired: undefined;
  SessionCompleted: { type?: 'invoice' | 'assessment' } | undefined;
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
      <Stack.Screen name="ConsultationList" component={ConsultationList}/>
      <Stack.Screen name="BookingCalendar" component={BookingCalendar}/>
      <Stack.Screen name="AddProfile" component={AddProfile}/>
      <Stack.Screen name="Transactions" component={Transactions}/>
      <Stack.Screen name="Contact" component={Contact}/>
      <Stack.Screen name="About" component={About}/>
      <Stack.Screen name="Invoice" component={Invoice}/>
      <Stack.Screen name="PayslipDetail" component={PayslipDetail}/>
      <Stack.Screen name="Assessment" component={Assessment}/>
      <Stack.Screen name="FAQ" component={FAQ}/>
      <Stack.Screen name="CoachProfile" component={CoachProfile}/>
      {/* Payment & Session screens */}
      <Stack.Screen name="PurchaseSummary" component={PurchaseSummary}/>
      <Stack.Screen name="DoubleClickToPay" component={DoubleClickToPay} options={{ animation: 'fade' }}/>
      <Stack.Screen name="PaymentInProcess" component={PaymentInProcess}/>
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess}/>
      <Stack.Screen name="PaymentFailed" component={PaymentFailed}/>
      <Stack.Screen name="SessionExpired" component={SessionExpired}/>
      <Stack.Screen name="SessionCompleted" component={SessionCompleted}/>
    </Stack.Navigator>
  );
};
