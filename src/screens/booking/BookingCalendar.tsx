import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, TouchableOpacity, ImageSourcePropType } from 'react-native';
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
import PickerModal from '../../components/common/PickerModal';
import { useBookingCalendarLogic, DurationOption, MONTHS, DAYS } from '../../hooks/useBookingCalendar';

type BookingCalendarRouteParams = {
    BookingCalendar: { serviceId: number; image?: string };
};

const PRICE_PER_HOUR = 70;

function BookingCalendar() {
    const { isDark } = useTheme();
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<BookingCalendarRouteParams, 'BookingCalendar'>>();

    const serviceId = route.params?.serviceId || 1;
    const routeImage = route.params?.image;

    const {
        course,
        selectedDate, setSelectedDate,
        currentImageIndex, setCurrentImageIndex,
        selectedTime, setSelectedTime,
        selectedDuration, setSelectedDuration,
        currentMonth, currentYear,
        handlePrevMonth, handleNextMonth,
        calendarDays,
        helpers,
        specialDayNumbers,
        weeklyDayNumbers,
        isBookingComplete,
        timeOptions,
        durationOptions,
        isLoadingSlots
    } = useBookingCalendarLogic(serviceId);

    const images: (string | ImageSourcePropType)[] = course?.banner
        ? [course.banner]
        : routeImage
            ? [routeImage]
            : [];

    const [menuVisible, setMenuVisible] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDurationPicker, setShowDurationPicker] = useState(false);

    // Price calculation
    const totalPrice = Math.round(PRICE_PER_HOUR * (selectedDuration?.hours || 0));

    const cardBg = isDark ? '#242427' : '#F1F5F9';
    const cardBorder = isDark ? '#2A3240' : '#E2E8F0';
    const textPrimary = isDark ? '#F1F5F9' : '#0F172A';
    const textSecondary = isDark ? '#94A3B8' : '#64748B';
    const pageBg = isDark ? '#333337' : '#FFFFFF';

    const handlePrevImage = () => setCurrentImageIndex(p => p === 0 ? images.length - 1 : p - 1);
    const handleNextImage = () => setCurrentImageIndex(p => p === images.length - 1 ? 0 : p + 1);

    const bookingDateFormatted = helpers.formatBookingDate();

    return (
        <ScreenWrapper scroll={true} scrollViewProps={{ style: { backgroundColor: pageBg, marginBottom: 40 } }}>
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
                    isDateAvailable={helpers.isDateAvailable}
                    isToday={helpers.isToday}
                    getDateRangeStatus={helpers.getDateRangeStatus}
                    hasSingleBooking={(day: number) => specialDayNumbers.includes(day)}
                    isWeeklyDay={(day: number) => weeklyDayNumbers.includes(day)}
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
                bookingDate={helpers.formatBookingDate()}
                selectedTime={selectedTime || 'Select Time'}
                selectedDuration={selectedDuration?.label || 'Select Duration'}
                totalPrice={totalPrice}
                pricePerHour={PRICE_PER_HOUR}
                onTimePress={() => timeOptions.length > 0 && setShowTimePicker(true)}
                onDurationPress={() => durationOptions.length > 0 && setShowDurationPicker(true)}
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
                        if (!selectedDuration) return;
                        navigation.navigate('PurchaseSummary', {
                            serviceId,
                            date: helpers.formatBookingDate(),
                            time: selectedTime,
                            durationHours: selectedDuration.hours,
                            durationLabel: selectedDuration.label,
                            totalPrice,
                            serviceTitle: course?.title
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

            {/* Time Picker */}
            <PickerModal
                visible={showTimePicker}
                title="Select Time"
                options={timeOptions}
                selected={selectedTime}
                onSelect={(v: string) => setSelectedTime(v)}
                onClose={() => setShowTimePicker(false)}
                labelFn={(v) => v as string}
            />

            {/* Duration Picker */}
            <PickerModal
                visible={showDurationPicker}
                title="Select Duration"
                options={durationOptions}
                selected={selectedDuration as DurationOption}
                onSelect={(v: DurationOption) => setSelectedDuration(v)}
                onClose={() => setShowDurationPicker(false)}
                labelFn={(v) => (v as DurationOption).label}
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