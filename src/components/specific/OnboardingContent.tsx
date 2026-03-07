// src/components/specific/OnboardingContent.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { themeStorage } from '../../theme/storage';
import { useTheme } from '../../theme/ThemeContext';
import { colors } from '../../theme/colors';
import GlobalIcon from '../common/GlobalIcon';

const { height } = Dimensions.get('window');
type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  title: string;
  activeIndex: number;
  totalSlides: number;
  onNext: () => void;
}

const OnboardingContent: React.FC<Props> = ({
  title,
  activeIndex,
  totalSlides,
  onNext,
}) => {
  const navigation = useNavigation<NavProp>();
  const { isDark } = useTheme();

  const onboardingIndex = activeIndex - 1;
  const isLastSlide = activeIndex === totalSlides - 1;

  const bgColor = isDark ? '#333337' : '#FFFFFF';

  const gradientColors = isDark
    ? ['transparent', 'rgba(51,51,55,0.6)', 'rgba(51,51,55,0.95)', '#333337']
    : ['transparent', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.95)', '#FFFFFF'];

  const handleCreateAccount = () => {
    themeStorage.set('onboarding_seen', 'true');
    navigation.replace('Auth');
  };

  return (
    <View className="absolute bottom-0 left-0 right-0">

      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.3, 0.8, 1]}
        style={{ height: height * 0.11 }} 
      />

      <View
        style={{ backgroundColor: bgColor }}
        className="px-6 pb-10 items-center pt-2">

        {/* Title */}
        <Text
          className="text-xl font-extrabold text-center tracking-wide mb-4 leading-8"
          style={{ color: isDark ? '#F1F5F9' : '#0C213F' }}>
          {title}
        </Text>

        {/* Dots */}
        <View className="flex-row mb-7" style={{ gap: 8 }}>
          {[0, 1, 2].map(dotIndex => (
            <View
              key={dotIndex}
              style={{
                width: dotIndex === onboardingIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  dotIndex === onboardingIndex
                    ? isDark ? '#BDC3C7' : '#578096'
                    : isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </View>

        {/* NEXT / GET STARTED */}
        <TouchableOpacity
          onPress={onNext}
          activeOpacity={0.8}
          className="flex-row items-center justify-center w-full py-5 rounded-full mb-5"
          style={{
            backgroundColor: isDark ? '#BDC3C7' : '#578096',
            gap: 10,
          }}>
          <Text className={`text-${colors.primary} text-md font-bold tracking-widest`}>
            {isLastSlide ? 'GET STARTED' : 'NEXT'}
          </Text>
          <GlobalIcon
            name="arrow-right"
                library="FontAwesome6"
                size={18}
                color={colors.primary}
          />
        </TouchableOpacity>

        {/* Create Account */}
        <TouchableOpacity
          onPress={handleCreateAccount}
          activeOpacity={0.7}
          className="flex-row items-center"
          style={{ gap: 8 }}>
          <Text
            className="text-xs font-semibold tracking-widest"
            style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}>
            CREATE YOUR ACCOUNT
          </Text>
          <View
            className="w-6 h-6  items-center justify-center"
            style={{
            //   borderWidth: 1.5,
            //   borderColor: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)',
            }}>
           <GlobalIcon
  name="user-check"          
  library="FontAwesome6"
  size={18}
  color={colors.text.muted}
/>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default OnboardingContent;