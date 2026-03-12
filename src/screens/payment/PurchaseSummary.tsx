import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    Pressable,
    Platform,
} from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import GlobalIcon from '../../components/common/GlobalIcon';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

// ─── Static Data ────────────────────────────────────────────────────────────
const TIME_SLOTS = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM',
];

const DURATION_OPTIONS: { label: string; hours: number }[] = [
    { label: '30 minutes', hours: 0.5 },
    { label: '1 hour',    hours: 1 },
    { label: '1.5 hours', hours: 1.5 },
    { label: '2 hours',   hours: 2 },
    { label: '2.5 hours', hours: 2.5 },
    { label: '3 hours',   hours: 3 },
];

const RATE_PER_HOUR = 300; // $300 / hr

// ─── Helpers ─────────────────────────────────────────────────────────────────
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = Array.from({ length: 31 }, (_, i) => i + 1);
const YEARS  = [2024, 2025, 2026, 2027];

function formatDate(d: { day: number; month: number; year: number }) {
    return `${d.day} ${MONTHS[d.month]} ${d.year}`;
}

// ─── Tiny Picker Modal ────────────────────────────────────────────────────────
function PickerModal<T>({
    visible,
    title,
    options,
    selected,
    onSelect,
    onClose,
    labelFn,
}: {
    visible: boolean;
    title: string;
    options: T[];
    selected: T;
    onSelect: (v: T) => void;
    onClose: () => void;
    labelFn: (v: T) => string;
}) {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <Pressable
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' }}
                onPress={onClose}
            >
                <Pressable onPress={() => {}}>
                    <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
                        {/* Handle */}
                        <View style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 4 }}>
                            <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#CBD5E1' }} />
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', textAlign: 'center', paddingVertical: 12 }}>
                            {title}
                        </Text>
                        <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
                            {options.map((opt, idx) => {
                                const label = labelFn(opt);
                                const isSelected = labelFn(selected as T) === label;
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
                                            borderTopColor: '#F1F5F9',
                                            backgroundColor: isSelected ? '#EBF5FB' : '#fff',
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={{ fontSize: 16, color: isSelected ? '#578096' : '#374151', fontWeight: isSelected ? '700' : '400' }}>
                                            {label}
                                        </Text>
                                        {isSelected && (
                                            <GlobalIcon name="check" library="Feather" size={18} color="#578096" />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <View style={{ height: 30 }} />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

// ─── Date Picker Modal ────────────────────────────────────────────────────────
function DatePickerModal({
    visible,
    date,
    onSelect,
    onClose,
}: {
    visible: boolean;
    date: { day: number; month: number; year: number };
    onSelect: (d: { day: number; month: number; year: number }) => void;
    onClose: () => void;
}) {
    const [tempDay,   setTempDay]   = useState(date.day);
    const [tempMonth, setTempMonth] = useState(date.month);
    const [tempYear,  setTempYear]  = useState(date.year);

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
                            style={{ paddingVertical: 10, paddingHorizontal: 4, alignItems: 'center', borderRadius: 8, backgroundColor: sel ? '#E8F5E9' : 'transparent', marginVertical: 2 }}
                        >
                            <Text style={{ fontSize: 15, color: sel ? '#578096' : '#6B7280', fontWeight: sel ? '700' : '400' }}>{lbl}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        );
    }

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' }} onPress={onClose}>
                <Pressable onPress={() => {}}>
                    <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}>
                        <View style={{ alignItems: 'center', marginBottom: 6 }}>
                            <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#CBD5E1' }} />
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', textAlign: 'center', marginBottom: 16 }}>
                            Select Booking Date
                        </Text>

                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            {/* Day */}
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>Day</Text>
                                <Col items={DAYS} selected={tempDay} onPick={setTempDay} label={(v) => String(v)} />
                            </View>
                            {/* Month */}
                            <View style={{ flex: 2 }}>
                                <Text style={{ textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>Month</Text>
                                <Col items={MONTHS.map((m, i) => i)} selected={tempMonth} onPick={setTempMonth} label={(v) => MONTHS[v as number]} />
                            </View>
                            {/* Year */}
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>Year</Text>
                                <Col items={YEARS} selected={tempYear} onPick={setTempYear} label={(v) => String(v)} />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={confirm}
                            style={{ marginTop: 20, backgroundColor: '#578096', borderRadius: 40, paddingVertical: 14, alignItems: 'center' }}
                            activeOpacity={0.8}
                        >
                            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Confirm Date</Text>
                        </TouchableOpacity>
                        <View style={{ height: 16 }} />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
function PurchaseSummary() {
    const navigation = useNavigation<NavProp>();
    const [menuVisible, setMenuVisible] = useState(false);

    // State
    const [bookingDate, setBookingDate] = useState({ day: 18, month: 4, year: 2025 }); // May = index 4
    const [selectedTime, setSelectedTime] = useState('10:00 AM');
    const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[1]); // 1 hour default

    // Picker visibility
    const [showDatePicker,     setShowDatePicker]     = useState(false);
    const [showTimePicker,     setShowTimePicker]     = useState(false);
    const [showDurationPicker, setShowDurationPicker] = useState(false);

    // Calculation
    const totalPrice = (RATE_PER_HOUR * selectedDuration.hours).toFixed(0);
    const isHalf = selectedDuration.hours < 1;

    const handleProceedToPay = () => {
        navigation.navigate('DoubleClickToPay');
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header userName="Angelina" onMenuPress={() => setMenuVisible(true)} />

                {/* Session Image */}
                <View style={{ marginHorizontal: 24, marginTop: 12, marginBottom: 16 }}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800' }}
                        style={{ width: '100%', height: 200, borderRadius: 16 }}
                        resizeMode="cover"
                    />
                    {/* Nav arrows */}
                    <TouchableOpacity
                        style={{
                            position: 'absolute', left: 12, top: '50%',
                            width: 34, height: 34, borderRadius: 17,
                            backgroundColor: 'rgba(255,255,255,0.85)',
                            alignItems: 'center', justifyContent: 'center',
                            marginTop: -17,
                        }}
                    >
                        <GlobalIcon name="chevron-left" library="Feather" size={18} color="#1E3A5F" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            position: 'absolute', right: 12, top: '50%',
                            width: 34, height: 34, borderRadius: 17,
                            backgroundColor: '#1E3A5F',
                            alignItems: 'center', justifyContent: 'center',
                            marginTop: -17,
                        }}
                    >
                        <GlobalIcon name="chevron-right" library="Feather" size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 24 }}>
                    <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 12 }}>
                        EXECUTIVE COACHING SESSION
                    </Text>

                    {/* Divider */}
                    <View style={{ height: 1, backgroundColor: '#E5E7EB', marginBottom: 16 }} />

                    {/* Purchase Summary heading */}
                    <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 8 }}>
                        PURCHASE SUMMARY
                    </Text>
                    <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 20, marginBottom: 24 }}>
                        Sed ut perspiciatis unde omnis iste natus error sit thems voluptatem accusantium doloremque for a laudantium, totam rem aperiams, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </Text>

                    {/* ── Booking Date ─────────────────────────────── */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' }}>
                        <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}>Booking Date</Text>
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                            activeOpacity={0.7}
                        >
                            <Text style={{ fontSize: 15, color: '#6B7280' }}>{formatDate(bookingDate)}</Text>
                            <GlobalIcon name="edit-2" library="Feather" size={15} color="#578096" />
                        </TouchableOpacity>
                    </View>

                    {/* ── Time Selected ─────────────────────────────── */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' }}>
                        <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}>Time Selected</Text>
                        <TouchableOpacity
                            onPress={() => setShowTimePicker(true)}
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
                            activeOpacity={0.7}
                        >
                            <Text style={{ fontSize: 15, color: '#578096', fontWeight: '600', textDecorationLine: 'underline' }}>
                                {selectedTime}  ▾
                            </Text>
                            <GlobalIcon name="edit-2" library="Feather" size={15} color="#578096" />
                        </TouchableOpacity>
                    </View>

                    {/* ── Duration ─────────────────────────────────── */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' }}>
                        <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}>Duration</Text>
                        <TouchableOpacity
                            onPress={() => setShowDurationPicker(true)}
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
                            activeOpacity={0.7}
                        >
                            <Text style={{ fontSize: 15, color: '#578096', fontWeight: '600', textDecorationLine: 'underline' }}>
                                {selectedDuration.label}  ▾
                            </Text>
                            <GlobalIcon name="edit-2" library="Feather" size={15} color="#578096" />
                        </TouchableOpacity>
                    </View>

                    {/* ── Price Calculation ─────────────────────────── */}
                    <View style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', marginBottom: 8 }}>
                        {/* Rate row */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                            <Text style={{ fontSize: 13, color: '#9CA3AF' }}>
                                ${RATE_PER_HOUR}/hr × {selectedDuration.hours} hr{selectedDuration.hours !== 1 ? 's' : ''}
                            </Text>
                            <Text style={{ fontSize: 13, color: '#9CA3AF' }}>${totalPrice}</Text>
                        </View>
                    </View>

                    {/* ── Total ────────────────────────────────────── */}
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'flex-end', marginBottom: 28, marginTop: 8 }}>
                        <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827' }}>${totalPrice}</Text>
                        <Text style={{ fontSize: 16, color: '#9CA3AF', marginLeft: 4 }}>/ hrs</Text>
                    </View>

                    {/* ── Proceed to Payment ────────────────────────── */}
                    <TouchableOpacity
                        onPress={handleProceedToPay}
                        style={{ borderRadius: 40, paddingVertical: 16, alignItems: 'center', backgroundColor: '#578096', marginBottom: 32 }}
                        activeOpacity={0.85}
                    >
                        <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 16, letterSpacing: 1 }}>
                            PROCEED TO PAYMENT
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* ── Pickers ────────────────────────────────────────────────── */}
            <DatePickerModal
                visible={showDatePicker}
                date={bookingDate}
                onSelect={setBookingDate}
                onClose={() => setShowDatePicker(false)}
            />

            <PickerModal
                visible={showTimePicker}
                title="Select Time"
                options={TIME_SLOTS}
                selected={selectedTime}
                onSelect={setSelectedTime}
                onClose={() => setShowTimePicker(false)}
                labelFn={(v) => v as string}
            />

            <PickerModal
                visible={showDurationPicker}
                title="Select Duration"
                options={DURATION_OPTIONS}
                selected={selectedDuration}
                onSelect={setSelectedDuration}
                onClose={() => setShowDurationPicker(false)}
                labelFn={(v) => (v as typeof DURATION_OPTIONS[0]).label}
            />

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={(item) => console.log('Menu:', item)}
            />
        </ScreenWrapper>
    );
}

export default PurchaseSummary;
