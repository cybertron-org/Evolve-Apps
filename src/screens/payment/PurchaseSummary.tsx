import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import GlobalIcon from '../../components/common/GlobalIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

// Modular Components
import PickerModal from '../../components/common/PickerModal';
import DatePickerModal from '../../components/payment/DatePickerModal';
import SummaryInfoRow from '../../components/payment/SummaryInfoRow';

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
    { label: '1 hour', hours: 1 },
    { label: '1.5 hours', hours: 1.5 },
    { label: '2 hours', hours: 2 },
    { label: '2.5 hours', hours: 2.5 },
    { label: '3 hours', hours: 3 },
];

const RATE_PER_HOUR = 70;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(d: { day: number; month: number; year: number }) {
    return `${d.day} ${MONTHS[d.month]} ${d.year}`;
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
function PurchaseSummary() {
    const { isDark } = useTheme();
    const navigation = useNavigation<NavProp>();
    const route = useRoute<any>();
    const [menuVisible, setMenuVisible] = useState(false);

    // Initial state from route params if available
    const initialDateStr = route.params?.date || '18 May 2025';
    const dateParts = initialDateStr.split(' ');
    const initialDay = parseInt(dateParts[0]) || 18;
    const initialMonthName = dateParts[1] || 'May';
    const initialMonth = MONTHS.indexOf(initialMonthName) !== -1 ? MONTHS.indexOf(initialMonthName) : 4;
    const initialYear = parseInt(dateParts[2]) || 2025;

    // State
    const [bookingDate, setBookingDate] = useState({
        day: initialDay,
        month: initialMonth,
        year: initialYear
    });
    const [selectedTime, setSelectedTime] = useState(route.params?.time || '10:00 AM');

    const initialDurationHours = route.params?.durationHours || 1;
    const initialDuration = DURATION_OPTIONS.find(d => d.hours === initialDurationHours) || DURATION_OPTIONS[1];
    const [selectedDuration, setSelectedDuration] = useState(initialDuration);

    const serviceTitle = route.params?.serviceTitle || 'EXECUTIVE COACHING SESSION';

    // Picker visibility
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDurationPicker, setShowDurationPicker] = useState(false);

    // Calculation
    const totalPrice = (RATE_PER_HOUR * selectedDuration.hours).toFixed(0);

    const handleProceedToPay = () => {
        navigation.navigate('DoubleClickToPay');
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header userName="Angelina" onMenuPress={() => setMenuVisible(true)} />

                {/* Session Image Section */}
                <View style={{ marginHorizontal: 24, marginTop: 12, marginBottom: 16 }}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800' }}
                        style={{ width: '100%', height: 200, borderRadius: 16 }}
                        resizeMode="cover"
                    />
                    <TouchableOpacity style={{ position: 'absolute', left: 12, top: '50%', width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.85)', alignItems: 'center', justifyContent: 'center', marginTop: -17 }}>
                        <GlobalIcon name="chevron-left" library="Feather" size={18} color="#1E3A5F" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ position: 'absolute', right: 12, top: '50%', width: 34, height: 34, borderRadius: 17, backgroundColor: '#1E3A5F', alignItems: 'center', justifyContent: 'center', marginTop: -17 }}>
                        <GlobalIcon name="chevron-right" library="Feather" size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 24 }}>
                    <AppText style={{ fontSize: 22, fontWeight: '800', color: isDark ? '#E5E7EB' : '#111827', marginBottom: 12 }}>
                        {serviceTitle.toUpperCase()}
                    </AppText>

                    <View style={{ height: 1, backgroundColor: isDark ? '#374151' : '#E5E7EB', marginBottom: 16 }} />

                    <AppText style={{ fontSize: 18, fontWeight: '800', color: isDark ? '#E5E7EB' : '#111827', marginBottom: 8 }}>
                        PURCHASE SUMMARY
                    </AppText>
                    <AppText style={{ fontSize: 13, color: isDark ? '#9CA3AF' : '#6B7280', lineHeight: 20, marginBottom: 24 }}>
                        Sed ut perspiciatis unde omnis iste natus error sit thems voluptatem accusantium doloremque for a laudantium, totam rem aperiams, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </AppText>

                    {/* Booking Rows */}
                    <SummaryInfoRow
                        label="Booking Date"
                        value={formatDate(bookingDate)}
                        onPress={() => setShowDatePicker(true)}
                    />
                    <SummaryInfoRow
                        label="Time Selected"
                        value={selectedTime}
                        onPress={() => setShowTimePicker(true)}
                        showChevron
                        underlineValue
                    />
                    <SummaryInfoRow
                        label="Duration"
                        value={selectedDuration.label}
                        onPress={() => setShowDurationPicker(true)}
                        showChevron
                        underlineValue
                    />




                    <View style={{ flexDirection:"row",justifyContent: 'flex-end', alignItems:"flex-end" , marginBottom: 28, marginTop: 8 }}>
                        <AppText style={{ fontSize: 32, fontWeight: '800', color: isDark ? '#E5E7EB' : '#111827' }}>${totalPrice}</AppText>
                        <AppText style={{ fontSize: 16, color: isDark ? '#E5E7EB' : '#111827', marginLeft: 4, paddingBottom: 4 }}> / hrs</AppText>
                    </View>

                    <TouchableOpacity
                        onPress={handleProceedToPay}
                        style={{ borderRadius: 40, paddingVertical: 16, alignItems: 'center', backgroundColor: '#578096', marginBottom: 32 }}
                        activeOpacity={0.85}
                    >
                        <AppText style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 16, letterSpacing: 1 }}>
                            PROCEED TO PAYMENT
                        </AppText>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Modals */}
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
                labelFn={(v) => (v as any).label}
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
