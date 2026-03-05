import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Evolve}from '../../assets/svg/index';

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
   
    <View className="flex-1 px-6">
  <View className="flex-1 justify-center">
    <View className="items-center">
      <View className="flex-row items-center">
        <Evolve width={250} height={250} fill="white" style={{ marginRight: 12 }} />
       
      </View>
    </View>
  </View>
  <View className="mb-20">
    <Text className="text-4xl font-bold text-left mb-3">
      Smart your {'\n'}journey with us
      
    </Text>
    <Text className="text-2xl text-left  ">
   Completes  these quick steps to get {'\n'} started
    </Text>
  </View>
</View>
  );
};