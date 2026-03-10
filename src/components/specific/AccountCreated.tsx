import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from '../../components/common/GlobalIcon';

const SPARKLES = [
  { angle: 320, distance: 100, color: '#F59E0B', size: 18, delay: 0,   icon: 'star' },
  { angle: 30,  distance: 110, color: '#F87171', size: 14, delay: 80,  icon: 'star' },
  { angle: 200, distance: 95,  color: '#60A5FA', size: 12, delay: 160, icon: 'plus' },
  { angle: 80,  distance: 105, color: '#60A5FA', size: 14, delay: 120, icon: 'plus' },
  { angle: 160, distance: 100, color: '#F472B6', size: 12, delay: 200, icon: 'star' },
  { angle: 60,  distance: 115, color: '#FCD34D', size: 12, delay: 240, icon: 'star' },
  { angle: 240, distance: 90,  color: '#818CF8', size: 10, delay: 180, icon: 'plus' },
  { angle: 120, distance: 100, color: '#F87171', size: 10, delay: 280, icon: 'plus' },
];

const getSparklePosition = (angle: number, distance: number) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * distance,
    y: Math.sin(rad) * distance,
  };
};

const AccountCreated: React.FC = () => {
  const { isDark } = useTheme();

  const badgeScale = useRef(new Animated.Value(0)).current;
  const badgeOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;


  const sparkleAnims = useRef(
    SPARKLES.map(() => ({
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
      translate: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(badgeScale, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(badgeOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

   sparkleAnims.forEach((anim, i) => {
      Animated.sequence([
        Animated.delay(SPARKLES[i].delay + 150),
        Animated.parallel([
              Animated.sequence([
            Animated.spring(anim.scale, {
              toValue: 1.3,
              tension: 100,
              friction: 4,
              useNativeDriver: true,
            }),
            Animated.spring(anim.scale, {
              toValue: 1,
              tension: 80,
              friction: 6,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(anim.translate, {
            toValue: 1,
            tension: 40,
            friction: 7,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });

 Animated.parallel([
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.spring(textTranslateY, {
        toValue: 0,
        tension: 60,
        friction: 8,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);


  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center px-8">

        <View style={{ width: 240, height: 240, alignItems: 'center', justifyContent: 'center' }}>

          {SPARKLES.map((sparkle, index) => {
            const { x, y } = getSparklePosition(sparkle.angle, sparkle.distance);
            const anim = sparkleAnims[index];

            const translateX = anim.translate.interpolate({
              inputRange: [0, 1],
              outputRange: [0, x],
            });
            const translateY = anim.translate.interpolate({
              inputRange: [0, 1],
              outputRange: [0, y],
            });

            return (
              <Animated.View
                key={index}
                style={{
                  position: 'absolute',
                  opacity: anim.opacity,
                  transform: [
                    { translateX },
                    { translateY },
                    { scale: anim.scale },
                  ],
                }}
              >
                <GlobalIcon
                  library="AntDesign"
                  name={sparkle.icon}
                  size={sparkle.size}
                  color={sparkle.color}
                />
              </Animated.View>
            );
          })}

          <Animated.View
            style={{
              opacity: badgeOpacity,
              transform: [{ scale: badgeScale }],
            }}
          >
            <View
              className="w-32 h-32 rounded-full items-center justify-center"
              style={{ backgroundColor: '#4CAF82' }}
            >
              <GlobalIcon
                library="MaterialIcons"
                name="verified"
                size={100}
                color="#4CAF82"
              />
              <View className="absolute">
                <GlobalIcon
                  library="MaterialIcons"
                  name="check"
                  size={60}
                  color="#FFFFFF"
                />
              </View>
            </View>
          </Animated.View>

        </View>

        <Animated.View
          className="items-center mt-8"
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          }}
        >
          <Text
            className={`text-2xl font-bold uppercase text-center leading-9 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}
            style={{ letterSpacing: 2 }}
          >
            ACCOUNT CREATED{'\n'}SUCCESSFULLY
          </Text>
        </Animated.View>

      </View>
    </ScreenWrapper>
  );
};

export default AccountCreated;