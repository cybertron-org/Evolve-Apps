import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from './GlobalIcon';

type SparkleConfig = {
  angle: number;
  distance: number;
  color: string;
  size: number;
  delay: number;
  icon: string;
};

type ButtonConfig = {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
};

type StatusScreenProps = {
  type?: 'success' | 'error' | 'loading' | 'info' | 'custom';
  title: string;
  subtitle?: string;
  iconName?: string;
  iconLibrary?: 'MaterialIcons' | 'AntDesign' | 'Feather' | 'Ionicons';
  iconSize?: number;
  iconColor?: string;
  badgeColor?: string;
  showSparkles?: boolean;
  sparklesConfig?: SparkleConfig[];
  buttons?: ButtonConfig[];
  customContent?: React.ReactNode;
};

const DEFAULT_SPARKLES: SparkleConfig[] = [
  { angle: 320, distance: 100, color: '#F59E0B', size: 18, delay: 0, icon: 'star' },
  { angle: 30, distance: 110, color: '#F87171', size: 14, delay: 80, icon: 'star' },
  { angle: 200, distance: 95, color: '#60A5FA', size: 12, delay: 160, icon: 'plus' },
  { angle: 80, distance: 105, color: '#60A5FA', size: 14, delay: 120, icon: 'plus' },
  { angle: 160, distance: 100, color: '#F472B6', size: 12, delay: 200, icon: 'star' },
  { angle: 60, distance: 115, color: '#FCD34D', size: 12, delay: 240, icon: 'star' },
  { angle: 240, distance: 90, color: '#818CF8', size: 10, delay: 180, icon: 'plus' },
  { angle: 120, distance: 100, color: '#F87171', size: 10, delay: 280, icon: 'plus' },
];

const getSparklePosition = (angle: number, distance: number) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * distance,
    y: Math.sin(rad) * distance,
  };
};

const getDefaultConfig = (type: string) => {
  switch (type) {
    case 'success':
      return {
        iconName: 'verified',
        iconLibrary: 'MaterialIcons' as const,
        iconColor: '#4CAF82',
        badgeColor: '#4CAF82',
        showSparkles: true,
      };
    case 'error':
      return {
        iconName: 'close-circle',
        iconLibrary: 'Ionicons' as const,
        iconColor: '#EF4444',
        badgeColor: '#EF4444',
        showSparkles: false,
      };
    case 'loading':
      return {
        iconName: 'hourglass-empty',
        iconLibrary: 'MaterialIcons' as const,
        iconColor: '#60A5FA',
        badgeColor: '#60A5FA',
        showSparkles: false,
      };
    case 'info':
      return {
        iconName: 'info',
        iconLibrary: 'Feather' as const,
        iconColor: '#3B82F6',
        badgeColor: '#3B82F6',
        showSparkles: false,
      };
    default:
      return {
        iconName: 'check',
        iconLibrary: 'Feather' as const,
        iconColor: '#4CAF82',
        badgeColor: '#4CAF82',
        showSparkles: false,
      };
  }
};

const StatusScreen: React.FC<StatusScreenProps> = ({
  type = 'success',
  title,
  subtitle,
  iconName,
  iconLibrary,
  iconSize = 100,
  iconColor,
  badgeColor,
  showSparkles,
  sparklesConfig,
  buttons = [],
  customContent,
}) => {
  const { isDark } = useTheme();
  const defaults = getDefaultConfig(type);

  const finalIconName = iconName || defaults.iconName;
  const finalIconLibrary = iconLibrary || defaults.iconLibrary;
  const finalIconColor = iconColor || defaults.iconColor;
  const finalBadgeColor = badgeColor || defaults.badgeColor;
  const finalShowSparkles = showSparkles !== undefined ? showSparkles : defaults.showSparkles;
  const finalSparkles = sparklesConfig || DEFAULT_SPARKLES;

  const badgeScale = useRef(new Animated.Value(0)).current;
  const badgeOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;

  const sparkleAnims = useRef(
    finalSparkles.map(() => ({
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

    if (finalShowSparkles) {
      sparkleAnims.forEach((anim, i) => {
        Animated.sequence([
          Animated.delay(finalSparkles[i].delay + 150),
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
    }

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
    <View className="flex-1 justify-center items-center px-8">
      <View style={{ width: 240, height: 240, alignItems: 'center', justifyContent: 'center' }}>
        {finalShowSparkles &&
          finalSparkles.map((sparkle, index) => {
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
                  transform: [{ translateX }, { translateY }, { scale: anim.scale }],
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
            style={{ backgroundColor: finalBadgeColor }}
          >
            <GlobalIcon
              library={finalIconLibrary}
              name={finalIconName}
              size={iconSize}
              color={finalIconColor}
            />
            {type === 'success' && (
              <View className="absolute">
                <GlobalIcon library="MaterialIcons" name="check" size={60} color="#FFFFFF" />
              </View>
            )}
          </View>
        </Animated.View>
      </View>

      <Animated.View
        className="items-center mt-8 px-4"
        style={{
          opacity: textOpacity,
          transform: [{ translateY: textTranslateY }],
        }}
      >
        <Text
          className={`text-2xl font-bold uppercase text-center ${
            isDark ? 'text-gray-100' : 'text-gray-900'
          }`}
          style={{ letterSpacing: 2, lineHeight: 36 }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            className={`text-base text-center mt-2 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {subtitle}
          </Text>
        )}
      </Animated.View>

      {customContent && (
        <Animated.View
          className="mt-6 w-full"
          style={{
            opacity: textOpacity,
          }}
        >
          {customContent}
        </Animated.View>
      )}

      {buttons.length > 0 && (
        <Animated.View
          className="w-full mt-8"
          style={{
            opacity: textOpacity,
          }}
        >
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              onPress={button.onPress}
              className="w-full rounded-full py-4 mb-3"
              style={{ backgroundColor: button.backgroundColor || '#578096' }}
            >
              <Text
                className="text-center font-bold text-lg"
                style={{ color: button.textColor || '#FFFFFF' }}
              >
                {button.text}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

export default StatusScreen;
