import AppText from './AppText';
// src/components/common/Toast.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, Easing, StyleSheet } from 'react-native';
import { useToast } from '../../hooks/useToast';

const STYLES = {
  success: {
    container:  'bg-[#1a2e22] border border-[#2ecc71]',
    accentBar:  'bg-[#2ecc71]',
    iconWrapper:'border border-[#2ecc71] bg-white/5',
    title:      'text-[#d4f5e2]',
    message:    'text-[#d4f5e2] opacity-75',
    dot:        'bg-[#2ecc71]'},
  error: {
    container:  'bg-[#2e1a1a] border border-[#e74c3c]',
    accentBar:  'bg-[#e74c3c]',
    iconWrapper:'border border-[#e74c3c] bg-white/5',
    title:      'text-[#f5d4d4]',
    message:    'text-[#f5d4d4] opacity-75',
    dot:        'bg-[#e74c3c]'},
  info: {
    container:  'bg-[#1a2535] border border-[#578096]',
    accentBar:  'bg-[#578096]',
    iconWrapper:'border border-[#578096] bg-white/5',
    title:      'text-[#d4e8f5]',
    message:    'text-[#d4e8f5] opacity-75',
    dot:        'bg-[#578096]'}};

const Toast: React.FC = () => {
  const { toast } = useToast();
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity    = useRef(new Animated.Value(0)).current;
  const scale      = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    if (!toast) return;

    Animated.parallel([
      Animated.spring(translateY, { toValue: 0, damping: 18, stiffness: 200, useNativeDriver: true }),
      Animated.timing(opacity,    { toValue: 1, duration: 250, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.spring(scale,      { toValue: 1, damping: 16, stiffness: 180, useNativeDriver: true }),
    ]).start();

    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, { toValue: -120, duration: 320, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
        Animated.timing(opacity,    { toValue: 0, duration: 280, useNativeDriver: true }),
        Animated.timing(scale,      { toValue: 0.92, duration: 280, useNativeDriver: true }),
      ]).start();
    }, toast.duration ?? 8000);

    return () => clearTimeout(timeout);
  }, [toast]);

  if (!toast) return null;

  const s = STYLES[toast.type ?? 'info'];

  return (
    <Animated.View
      style={[styles.wrapper, { opacity, transform: [{ translateY }, { scale }] }]}
      pointerEvents="none"
    >
      <View className={`w-full flex-row items-center rounded-2xl px-4 py-4 gap-3 ${s.container}`}
        style={styles.shadow}
      >
        <View className={`absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-full ${s.accentBar}`} />

        <View className={`w-10 h-10 rounded-xl items-center justify-center ml-2 overflow-hidden ${s.iconWrapper}`}>
          <Image
            source={require('../../assets/images/icon.png')} 
            className="w-7 h-7"
            resizeMode="contain"
          />
        </View>

        {/* Text */}
        <View className="flex-1 gap-0.5">
          <AppText className={`text-sm font-bold tracking-wide ${s.title}`}>
            {toast.title}
          </AppText>
          {toast.message ? (
            <AppText className={`text-xs mt-0.5 ${s.message}`}>
              {toast.message}
            </AppText>
          ) : null}
        </View>

        {/* Status dot */}
        <View className={`w-2 h-2 rounded-full self-center ${s.dot}`} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position:  'absolute',
    top:        52,
    left:       16,
    right:      16,
    zIndex:     9999,
    elevation:  20,
    alignItems: 'center'},
  shadow: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius:  16}});

export default Toast;