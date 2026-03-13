import AppText from '../../components/common/AppText';
// src/screens/auth/WelcomeScreen.tsx
import React, { useRef, useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import { useTheme } from '../../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { themeStorage } from '../../theme/storage';
import OnboardingContent from '../../components/specific/OnboardingContent';

const { width, height } = Dimensions.get('screen');
type NavProp = NativeStackNavigationProp<RootStackParamList>;

const TOTAL_SLIDES = 4;

export const WelcomeScreen: React.FC = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation<NavProp>();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
// console.log("welcome=>",isDark)
  const handleNext = () => {
    if (activeIndex === TOTAL_SLIDES - 1) {
      themeStorage.set('onboarding_seen', 'true');
      navigation.navigate('Auth');
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  return (
    <Swiper
      ref={swiperRef}
      loop={false}
      showsButtons={false}
      showsPagination={false}
      onIndexChanged={setActiveIndex}>

      {/* ───── Slide 1: Welcome ───── */}
      <ScreenWrapper safe={false}>
        <View className="flex-1 justify-end items-center mb-52">
          <Image
            source={
              isDark
                ? require('../../assets/images/light.png')
                : require('../../assets/images/dark.png')
            }
            style={{ width: 320, height: 320 }}
            resizeMode="contain"
          />
        </View>
        <View className="mb-16 px-6 gap-y-4">
          <AppText className="text-sublabel dark:text-sublabel-dark text-center tracking-widest uppercase">
            LOW-SENSORY MODE
          </AppText>
          <ThemeToggle />
        </View>
      </ScreenWrapper>

      {/* ───── Slide 2: Onboarding 1 ───── */}
      <View className="flex-1">
        <Image
  source={require('../../assets/images/onboarding1.png')}
  className="absolute top-0 left-0 right-0 bottom-0"
  resizeMode="cover"
/>
       
        <OnboardingContent
          title={'YOUR DIFFERENCES ARE YOUR SUPERPOWERS'}
          activeIndex={activeIndex}
          totalSlides={TOTAL_SLIDES}
          onNext={handleNext}
        />
      </View>

      {/* ───── Slide 3: Onboarding 2 ───── */}
      <View className="flex-1">
       <Image
  source={require('../../assets/images/onboarding2.png')}
  className="absolute top-0 left-0 right-0 bottom-0"
  resizeMode="cover"
/>

       
        <OnboardingContent
          title={'EMBRACE THEM AND LET THEM\nSHINE!'}
          activeIndex={activeIndex}
          totalSlides={TOTAL_SLIDES}
          onNext={handleNext}
        />
      </View>

      {/* ───── Slide 4: Onboarding 3 ───── */}
      <View className="flex-1">
       <Image
  source={require('../../assets/images/onboarding3.png')}
  className="absolute top-0 left-0 right-0 bottom-0"
  resizeMode="cover"
/>
       
        <OnboardingContent
          title={'LOREM IPSUM DOLOR SIT AND\nAMET, CONSECTETUR'}
          activeIndex={activeIndex}
          totalSlides={TOTAL_SLIDES}
          onNext={handleNext}
        />
      </View>

    </Swiper>
  );
};
