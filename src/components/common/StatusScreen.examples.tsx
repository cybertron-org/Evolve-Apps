import AppText from './AppText';
/**
 * StatusScreen Component - Usage Examples
 * 
 * This file demonstrates various ways to use the StatusScreen component
 */

import React from 'react';
import { View} from 'react-native';
import { ScreenWrapper } from '../specific/ScreenWrapper';
import StatusScreen from './StatusScreen';

// Example 1: Simple Success Screen (like Account Created)
export const SuccessExample = () => (
  <ScreenWrapper>
    <StatusScreen
      type="success"
      title="ACCOUNT CREATED SUCCESSFULLY"
    />
  </ScreenWrapper>
);

// Example 2: Consultation Session Completed with Buttons
export const ConsultationCompletedExample = () => (
  <ScreenWrapper>
    <StatusScreen
      type="success"
      title="CONSULTATION SESSION COMPLETED"
      buttons={[
        {
          text: 'PAY INVOICE',
          onPress: () => console.log('Pay Invoice'),
          backgroundColor: '#578096'},
      ]}
      customContent={
        <AppText className="text-center text-red-500 text-sm mt-4">
          Generated Invoice $60
        </AppText>
      }
    />
  </ScreenWrapper>
);

// Example 3: Consultation with Assessment Button
export const ConsultationWithAssessmentExample = () => (
  <ScreenWrapper>
    <StatusScreen
      type="success"
      title="CONSULTATION SESSION COMPLETED"
      buttons={[
        {
          text: 'INTAKE ASSESSMENT',
          onPress: () => console.log('Intake Assessment'),
          backgroundColor: '#1E3A5F'},
      ]}
    />
  </ScreenWrapper>
);

// Example 4: Payment Failed Screen
export const PaymentFailedExample = () => (
  <ScreenWrapper>
    <StatusScreen
      type="error"
      title="YOUR PAYMENT HAS BEEN FAILED"
      iconName="credit-card"
      iconLibrary="Feather"
      iconSize={80}
      iconColor="#EF4444"
      badgeColor="#EF4444"
      buttons={[
        {
          text: 'TRY AGAIN',
          onPress: () => console.log('Try Again'),
          backgroundColor: '#F87171'},
      ]}
    />
  </ScreenWrapper>
);

// Example 5: Payment In-Process Screen
export const PaymentInProcessExample = () => (
  <ScreenWrapper>
    <StatusScreen
      type="loading"
      title="YOUR PAYMENT IS IN-PROCESS"
      iconName="hourglass-empty"
      iconLibrary="MaterialIcons"
      iconSize={80}
      iconColor="#60A5FA"
      badgeColor="#60A5FA"
      buttons={[
        {
          text: "DON'T PRESS BACK",
          onPress: () => console.log('Warning'),
          backgroundColor: '#1E3A5F'},
      ]}
    />
  </ScreenWrapper>
);

// Example 6: Custom Icon and Colors
export const CustomExample = () => (
  <ScreenWrapper>
    <StatusScreen
      type="custom"
      title="BOOKING CONFIRMED"
      subtitle="Your appointment has been scheduled"
      iconName="calendar-check"
      iconLibrary="Feather"
      iconSize={80}
      iconColor="#10B981"
      badgeColor="#10B981"
      showSparkles={true}
      buttons={[
        {
          text: 'VIEW DETAILS',
          onPress: () => console.log('View Details'),
          backgroundColor: '#10B981'},
        {
          text: 'GO HOME',
          onPress: () => console.log('Go Home'),
          backgroundColor: '#6B7280'},
      ]}
    />
  </ScreenWrapper>
);

// Example 7: Info Screen without Sparkles
export const InfoExample = () => (
  <ScreenWrapper>
    <StatusScreen
      type="info"
      title="VERIFICATION PENDING"
      subtitle="Please check your email to verify your account"
      showSparkles={false}
      buttons={[
        {
          text: 'RESEND EMAIL',
          onPress: () => console.log('Resend Email'),
          backgroundColor: '#3B82F6'},
      ]}
    />
  </ScreenWrapper>
);

// Example 8: Custom Content with Multiple Buttons
export const CustomContentExample = () => (
  <ScreenWrapper>
    <StatusScreen
      type="success"
      title="ORDER PLACED"
      subtitle="Order #12345"
      customContent={
        <View className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 w-full">
          <AppText className="text-center text-gray-900 dark:text-white font-bold">
            Estimated Delivery
          </AppText>
          <AppText className="text-center text-gray-600 dark:text-gray-400 mt-1">
            March 15, 2026
          </AppText>
        </View>
      }
      buttons={[
        {
          text: 'TRACK ORDER',
          onPress: () => console.log('Track Order'),
          backgroundColor: '#578096'},
        {
          text: 'CONTINUE SHOPPING',
          onPress: () => console.log('Continue Shopping'),
          backgroundColor: '#6B7280'},
      ]}
    />
  </ScreenWrapper>
);
