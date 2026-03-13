import React, { useState, useEffect } from 'react';
import { View, Modal, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import AppText from '../common/AppText';
import { useTheme } from '../../theme/ThemeContext';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = Array.from({ length: 31 }, (_, i) => i + 1);
const YEARS  = [2024, 2025, 2026, 2027];

interface DatePickerModalProps {
    visible: boolean;
    date: { day: number; month: number; year: number };
    onSelect: (d: { day: number; month: number; year: number }) => void;
    onClose: () => void;
}

export default function DatePickerModal({
    visible,
    date,
    onSelect,
    onClose
}: DatePickerModalProps) {
    const { isDark } = useTheme();
    const [tempDay,   setTempDay]   = useState(date.day);
    const [tempMonth, setTempMonth] = useState(date.month);
    const [tempYear,  setTempYear]  = useState(date.year);

    useEffect(() => {
        if (visible) {
            setTempDay(date.day);
            setTempMonth(date.month);
            setTempYear(date.year);
        }
    }, [visible, date]);

    const confirm = () => { onSelect({ day: tempDay, month: tempMonth, year: tempYear }); onClose(); };

    function Col<T>({ items, selected, onPick, label }: { items: T[]; selected: T; onPick: (v: T) => void; label: (v: T) => string }) {
        return (
            <ScrollView style={{ flex: 1, maxHeight: 200 }} showsVerticalScrollIndicator={false}>
                {items.map((item, i) => {
                    const lbl = label(item);
                    const sel = label(selected) === lbl;
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => onPick(item)}
                            style={{ 
                                paddingVertical: 10, 
                                paddingHorizontal: 4, 
                                alignItems: 'center', 
                                borderRadius: 8, 
                                backgroundColor: sel ? (isDark ? 'rgba(87, 128, 150, 0.2)' : '#E8F5E9') : 'transparent', 
                                marginVertical: 2 
                            }}
                        >
                            <AppText style={{ fontSize: 15, color: sel ? '#578096' : (isDark ? '#9CA3AF' : '#6B7280'), fontWeight: sel ? '700' : '400' }}>{lbl}</AppText>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        );
    }

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }} onPress={onClose}>
                <Pressable onPress={() => {}}>
                    <View style={{ backgroundColor: isDark ? '#1F2937' : '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}>
                        <View style={{ alignItems: 'center', marginBottom: 6 }}>
                            <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: isDark ? '#4B5563' : '#CBD5E1' }} />
                        </View>
                        <AppText style={{ fontSize: 16, fontWeight: '700', color: isDark ? '#E5E7EB' : '#111827', textAlign: 'center', marginBottom: 16 }}>
                            Select Booking Date
                        </AppText>

                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <View style={{ flex: 1 }}>
                                <AppText style={{ textAlign: 'center', fontSize: 12, color: isDark ? '#9CA3AF' : '#9CA3AF', marginBottom: 4 }}>Day</AppText>
                                <Col items={DAYS} selected={tempDay} onPick={setTempDay} label={(v) => String(v)} />
                            </View>
                            <View style={{ flex: 2 }}>
                                <AppText style={{ textAlign: 'center', fontSize: 12, color: isDark ? '#9CA3AF' : '#9CA3AF', marginBottom: 4 }}>Month</AppText>
                                <Col items={MONTHS.map((m, i) => i)} selected={tempMonth} onPick={setTempMonth} label={(v) => MONTHS[v as number]} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <AppText style={{ textAlign: 'center', fontSize: 12, color: isDark ? '#9CA3AF' : '#9CA3AF', marginBottom: 4 }}>Year</AppText>
                                <Col items={YEARS} selected={tempYear} onPick={setTempYear} label={(v) => String(v)} />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={confirm}
                            style={{ marginTop: 20, backgroundColor: '#578096', borderRadius: 40, paddingVertical: 14, alignItems: 'center' }}
                            activeOpacity={0.8}
                        >
                            <AppText style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Confirm Date</AppText>
                        </TouchableOpacity>
                        <View style={{ height: 16 }} />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}
