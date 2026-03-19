import React from 'react';
import { View, Modal, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import AppText from './AppText';
import GlobalIcon from './GlobalIcon';
import { useTheme } from '../../theme/ThemeContext';

interface PickerModalProps<T> {
    visible: boolean;
    title: string;
    options: T[];
    selected: T | null;
    onSelect: (v: T) => void;
    onClose: () => void;
    labelFn: (v: T) => string;
}

export default function PickerModal<T>({
    visible,
    title,
    options,
    selected,
    onSelect,
    onClose,
    labelFn
}: PickerModalProps<T>) {
    const { isDark } = useTheme();

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <Pressable
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }}
                onPress={onClose}
            >
                <Pressable onPress={() => {}}>
                    <View style={{ backgroundColor: isDark ? '#1F2937' : '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
                        <View style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 4 }}>
                            <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: isDark ? '#4B5563' : '#CBD5E1' }} />
                        </View>
                        <AppText style={{ fontSize: 16, fontWeight: '700', color: isDark ? '#E5E7EB' : '#111827', textAlign: 'center', paddingVertical: 12 }}>
                            {title}
                        </AppText>
                        <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
                            {options.map((opt, idx) => {
                                const label = labelFn(opt);
                                const isSelected = selected !== null && selected !== undefined ? labelFn(selected as T) === label : false;
                                return (
                                    <TouchableOpacity
                                        key={idx}
                                        onPress={() => { onSelect(opt); onClose(); }}
                                        style={{
                                            paddingVertical: 14,
                                            paddingHorizontal: 24,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            borderTopWidth: idx > 0 ? 1 : 0,
                                            borderTopColor: isDark ? '#374151' : '#F1F5F9',
                                            backgroundColor: isSelected ? (isDark ? 'rgba(87, 128, 150, 0.2)' : '#EBF5FB') : 'transparent'
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <AppText style={{ fontSize: 16, color: isSelected ? '#578096' : (isDark ? '#E5E7EB' : '#374151'), fontWeight: isSelected ? '700' : '400' }}>
                                            {label}
                                        </AppText>
                                        {isSelected && (
                                            <GlobalIcon name="check" library="Feather" size={18} color="#578096" />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <View style={{ height: 40 }} />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}
