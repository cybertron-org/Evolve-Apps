import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import ImageCarousel from '../../components/booking/ImageCarousel';
import CalendarHeader from '../../components/booking/CalendarHeader';
import CalendarGrid from '../../components/booking/CalendarGrid';
import CalendarLegend from '../../components/booking/CalendarLegend';
import BookingDetails from '../../components/booking/BookingDetails';
import GlobalIcon from '../../components/common/GlobalIcon';
import PickerModal from '../../components/common/PickerModal';
import { getServiceById, ServiceData } from '../../data/servicesData';
import { ImageSourcePropType } from 'react-native';

type BookingCalendarRouteParams = {
    BookingCalendar: { serviceId: number };
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const availableDates = [2, 3, 6, 8, 9, 10, 13, 15, 16, 17, 18, 20, 22, 28, 29, 30, 31];
const bookedRanges = [{ start: 18, end: 21 }];
const singleBookings = [2, 3, 6, 8, 10, 13, 17];

const PRICE_PER_HOUR = 70;

const TIME_OPTIONS = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

const DURATION_OPTIONS: { label: string; hours: number }[] = [
    { label: '30 mins',  hours: 0.5 },
    { label: '1:00 hr',  hours: 1   },
    { label: '1:30 hrs', hours: 1.5 },
    { label: '2:00 hrs', hours: 2   },
    { label: '2:30 hrs', hours: 2.5 },
    { label: '3:00 hrs', hours: 3   },
];

function BookingCalendar() {
    const { isDark } = useTheme();
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<BookingCalendarRouteParams, 'BookingCalendar'>>();

    // Get service data
    const serviceId = route.params?.serviceId || 1;
    const serviceData = getServiceById(serviceId);
    const images: (string | ImageSourcePropType)[] = serviceData?.images || [];

    // 1. Pehle saare plain constants
    const todayInit   = new Date();
    const todayDay    = todayInit.getDate();
    const todayMonth  = todayInit.getMonth();
    const todayYear   = todayInit.getFullYear();

    // 2. Phir saare useState hooks ek saath
    const [menuVisible, setMenuVisible]           = useState(false);
    const [selectedDate, setSelectedDate]         = useState<number | null>(null); 
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedTime, setSelectedTime]         = useState('10:00 AM');
    const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[1]);
    const [showTimePicker, setShowTimePicker]     = useState(false);
    const [showDurationPicker, setShowDurationPicker] = useState(false);
    const [currentMonth, setCurrentMonth]         = useState(todayMonth);
    const [currentYear, setCurrentYear]           = useState(todayYear);

    const handlePrevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
    };
    const handleNextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
    };

    const getDaysInMonth   = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (m: number, y: number) => {
        const d = new Date(y, m, 1).getDay();
        return d === 0 ? 6 : d - 1;
    };

    const daysInMonth  = getDaysInMonth(currentMonth, currentYear);
    const firstDay     = getFirstDayOfMonth(currentMonth, currentYear);
    const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);

    const calendarDays: { day: number; isCurrentMonth: boolean }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) calendarDays.push({ day: prevMonthDays - i, isCurrentMonth: false });
    for (let i = 1; i <= daysInMonth; i++)  calendarDays.push({ day: i, isCurrentMonth: true });
    const remaining = 42 - calendarDays.length;
    for (let i = 1; i <= remaining; i++)    calendarDays.push({ day: i, isCurrentMonth: false });

    const isDateAvailable = (day: number) => availableDates.includes(day);
    const isDateSelected  = (day: number) => selectedDate === day;
   const isToday = (day: number) =>
    day === todayDay &&
    currentMonth === todayMonth &&
    currentYear === todayYear;
    const hasSingleBooking = (day: number) => singleBookings.includes(day);

    const getDateRangeStatus = (day: number) => {
        for (const range of bookedRanges) {
            if (day === range.start) return 'range-start';
            if (day === range.end)   return 'range-end';
            if (day > range.start && day < range.end) return 'range-middle';
        }
        return null;
    };

    // Price calculation
    const totalPrice = Math.round(PRICE_PER_HOUR * selectedDuration.hours);

    const formatBookingDate = () => {
        if (!selectedDate) return 'Select a date';
        return `${selectedDate} ${MONTHS[currentMonth]} ${currentYear}`;
    };

    // Check if booking is complete
    const isBookingComplete = selectedDate !== null && selectedTime && selectedDuration;

    const cardBg       = isDark ? '#242427' : '#F1F5F9';
    const cardBorder   = isDark ? '#2A3240' : '#E2E8F0';
    const textPrimary  = isDark ? '#F1F5F9' : '#0F172A';
    const textSecondary = isDark ? '#94A3B8' : '#64748B';
    const pageBg       = isDark ? '#333337' : '#FFFFFF';

    const handlePrevImage = () => setCurrentImageIndex(p => p === 0 ? images.length - 1 : p - 1);
    const handleNextImage = () => setCurrentImageIndex(p => p === images.length - 1 ? 0 : p + 1);

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: pageBg }}>
                <Header userName="Angelina" onMenuPress={() => setMenuVisible(true)} />

                {/* Image Carousel */}
                <ImageCarousel
                    images={images}
                    currentIndex={currentImageIndex}
                    onPrevious={handlePrevImage}
                    onNext={handleNextImage}
                />

                {/* Calendar Card */}
                <View className="mx-6 mb-6 rounded-3xl overflow-hidden" style={{ backgroundColor: cardBg, borderWidth: 1, borderColor: cardBorder }}>
                    
                    {/* Month Navigation */}
                    <CalendarHeader
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        months={MONTHS}
                        onPrevMonth={handlePrevMonth}
                        onNextMonth={handleNextMonth}
                        isDark={isDark}
                        textPrimary={textPrimary}
                        textSecondary={textSecondary}
                        cardBorder={cardBorder}
                    />

                    {/* Day Headers */}
                    <View className="flex-row px-2 mb-1">
                        {DAYS.map((day) => (
                            <View key={day} style={{ width: '14.28%', alignItems: 'center' }}>
                                <AppText style={{ color: textSecondary, fontSize: 12, fontWeight: '500' }}>{day}</AppText>
                            </View>
                        ))}
                    </View>

                    {/* Calendar Grid */}
                    <CalendarGrid
                        calendarDays={calendarDays}
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                        isDateAvailable={isDateAvailable}
                        isToday={isToday}
                        getDateRangeStatus={getDateRangeStatus}
                        isDark={isDark}
                        textPrimary={textPrimary}
                        textSecondary={textSecondary}
                    />

                    {/* Legend */}
                    <CalendarLegend textSecondary={textSecondary} />

                    {/* Bottom pill */}
                    <View style={{ alignItems: 'center', paddingBottom: 12 }}>
                        <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: isDark ? '#3A4455' : '#CBD5E1' }} />
                    </View>
                </View>

                {/* Booking Details */}
                <BookingDetails
                    bookingDate={formatBookingDate()}
                    selectedTime={selectedTime}
                    selectedDuration={selectedDuration.label}
                    totalPrice={totalPrice}
                    pricePerHour={PRICE_PER_HOUR}
                    onTimePress={() => setShowTimePicker(true)}
                    onDurationPress={() => setShowDurationPicker(true)}
                    textPrimary={textPrimary}
                    textSecondary={textSecondary}
                    cardBorder={cardBorder}
                />

                {/* BOOK NOW */}
                <View className="px-6 mb-8">
                    <TouchableOpacity 
                        activeOpacity={0.85}
                        disabled={!isBookingComplete}
                        onPress={() => {
                            navigation.navigate('PurchaseSummary', {
                                serviceId,
                                date: formatBookingDate(),
                                time: selectedTime,
                                durationHours: selectedDuration.hours,
                                durationLabel: selectedDuration.label,
                                totalPrice,
                                serviceTitle: serviceData?.title
                            });
                        }}
                        style={{ 
                            backgroundColor: isBookingComplete ? '#1ABC9C' : '#94A3B8', 
                            borderRadius: 50, 
                            paddingVertical: 18, 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            opacity: isBookingComplete ? 1 : 0.5
                        }}
                    >
                        <AppText style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '800', letterSpacing: 2 }}>
                            BOOK NOW
                        </AppText>
                    </TouchableOpacity>
                </View>

                <View className="h-6" />
            </ScrollView>

            {/* Time Picker */}
            <PickerModal
                visible={showTimePicker}
                title="Select Time"
                options={TIME_OPTIONS}
                selected={selectedTime}
                onSelect={(v: string) => setSelectedTime(v)}
                onClose={() => setShowTimePicker(false)}
                labelFn={(v) => v as string}
            />

            {/* Duration Picker */}
            <PickerModal
                visible={showDurationPicker}
                title="Select Duration"
                options={DURATION_OPTIONS}
                selected={selectedDuration}
                onSelect={(v: typeof DURATION_OPTIONS[0]) => setSelectedDuration(v)}
                onClose={() => setShowDurationPicker(false)}
                labelFn={(v) => (v as typeof DURATION_OPTIONS[0]).label}
            />

            <MenuDrawer 
                visible={menuVisible} 
                onClose={() => setMenuVisible(false)} 
                onMenuItemPress={(item) => console.log(item)} 
            />
        </ScreenWrapper>
    );
}

export default BookingCalendar;