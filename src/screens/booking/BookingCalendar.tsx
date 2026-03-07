import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import { useRoute, RouteProp } from '@react-navigation/native';
import GlobalIcon from '../../components/common/GlobalIcon';

type BookingCalendarRouteParams = {
    BookingCalendar: {
        serviceId: number;
    };
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Sample data - dates with availability and bookings
const availableDates = [2, 3, 6, 8, 9, 10, 13, 15, 16, 17, 18, 20, 22, 28, 29, 30, 31];
const bookedRanges = [
    { start: 15, end: 18 }, // Range booking
];
const singleBookings = [2, 3, 6, 8, 10, 13, 17]; // Single day bookings with dots

function BookingCalendar() {
    const { isDark } = useTheme();
    const route = useRoute<RouteProp<BookingCalendarRouteParams, 'BookingCalendar'>>();
    const [menuVisible, setMenuVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(4); // May = 4
    const [currentYear, setCurrentYear] = useState(2023);
    const [selectedDate, setSelectedDate] = useState<number>(2);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
    ];

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);

    const calendarDays = [];
    
    for (let i = firstDay - 1; i >= 0; i--) {
        calendarDays.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({ day: i, isCurrentMonth: true });
    }
    
    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
        calendarDays.push({ day: i, isCurrentMonth: false });
    }

    const isDateAvailable = (day: number) => availableDates.includes(day);
    const isDateSelected = (day: number) => selectedDate === day;
    const hasSingleBooking = (day: number) => singleBookings.includes(day);
    
    const getDateRangeStatus = (day: number) => {
        for (const range of bookedRanges) {
            if (day === range.start) return 'range-start';
            if (day === range.end) return 'range-end';
            if (day > range.start && day < range.end) return 'range-middle';
        }
        return null;
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />

                {/* Image Carousel */}
                <View className="mx-6 mt-4 mb-6 rounded-2xl overflow-hidden relative">
                    <Image
                        source={{ uri: images[currentImageIndex] }}
                        className="w-full h-56"
                        resizeMode="cover"
                    />
                    
                    <TouchableOpacity
                        onPress={handlePrevImage}
                        className="absolute left-4 top-1/2 -mt-5 w-10 h-10 rounded-full bg-white/80 items-center justify-center"
                    >
                        <GlobalIcon name="chevron-left" library="Feather" size={20} color="#1E293B" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleNextImage}
                        className="absolute right-4 top-1/2 -mt-5 w-10 h-10 rounded-full bg-white/80 items-center justify-center"
                    >
                        <GlobalIcon name="chevron-right" library="Feather" size={20} color="#1E293B" />
                    </TouchableOpacity>
                </View>

                {/* Title */}
                <View className="px-6 mb-6">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white text-center">
                        EXECUTIVE COACHING SESSION
                    </Text>
                </View>

                {/* Calendar */}
                <View className="px-6 mb-6">
                    {/* Month Navigation */}
                    <View className="flex-row items-center justify-between mb-6">
                        <TouchableOpacity onPress={handlePrevMonth} className="p-2">
                            <GlobalIcon name="chevron-left" library="Feather" size={24} color={isDark ? '#F1F5F9' : '#1E293B'} />
                        </TouchableOpacity>
                        
                        <View className="items-center">
                            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                                {MONTHS[currentMonth]}
                            </Text>
                            <Text className="text-sm text-gray-500 dark:text-gray-400">
                                {currentYear}
                            </Text>
                        </View>

                        <TouchableOpacity onPress={handleNextMonth} className="p-2">
                            <GlobalIcon name="chevron-right" library="Feather" size={24} color={isDark ? '#F1F5F9' : '#1E293B'} />
                        </TouchableOpacity>
                    </View>

                    {/* Day Headers */}
                    <View className="flex-row mb-2">
                        {DAYS.map((day) => (
                            <View key={day} className="flex-1 items-center">
                                <Text className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {day}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Calendar Grid */}
                    <View className="flex-row flex-wrap">
                        {calendarDays.map((item, index) => {
                            const isAvailable = item.isCurrentMonth && isDateAvailable(item.day);
                            const isSelected = item.isCurrentMonth && isDateSelected(item.day);
                            const hasDots = item.isCurrentMonth && hasSingleBooking(item.day);
                            const rangeStatus = item.isCurrentMonth ? getDateRangeStatus(item.day) : null;

                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        if (item.isCurrentMonth && isAvailable) {
                                            setSelectedDate(item.day);
                                        }
                                    }}
                                    disabled={!item.isCurrentMonth || !isAvailable}
                                    className="items-center justify-center mb-3"
                                    style={{ width: '14.28%', height: 50 }}
                                >
                                    <View
                                        className={`w-10 h-10 items-center justify-center ${
                                            rangeStatus === 'range-start' || rangeStatus === 'range-end'
                                                ? 'rounded-full'
                                                : ''
                                        }`}
                                        style={{
                                            backgroundColor: 
                                                isSelected
                                                    ? '#1E3A5F'
                                                    : rangeStatus === 'range-start' || rangeStatus === 'range-end'
                                                    ? '#FB7185'
                                                    : rangeStatus === 'range-middle'
                                                    ? '#FECDD3'
                                                    : 'transparent',
                                        }}
                                    >
                                        <Text
                                            className={`text-sm font-medium ${
                                                !item.isCurrentMonth
                                                    ? 'text-gray-300 dark:text-gray-600'
                                                    : isSelected || rangeStatus === 'range-start' || rangeStatus === 'range-end'
                                                    ? 'text-white'
                                                    : rangeStatus === 'range-middle'
                                                    ? 'text-gray-900'
                                                    : isAvailable
                                                    ? 'text-gray-900 dark:text-white'
                                                    : 'text-gray-400 dark:text-gray-500'
                                            }`}
                                        >
                                            {item.day}
                                        </Text>
                                    </View>
                                    
                                    {/* Dots for single bookings */}
                                    {hasDots && !rangeStatus && (
                                        <View className="flex-row gap-0.5 mt-1">
                                            <View className="w-1 h-1 rounded-full bg-blue-500" />
                                            <View className="w-1 h-1 rounded-full bg-blue-500" />
                                            <View className="w-1 h-1 rounded-full bg-gray-400" />
                                        </View>
                                    )}

                                    {/* Dots for range bookings */}
                                    {rangeStatus && (
                                        <View className="flex-row gap-0.5 mt-1">
                                            <View className="w-1 h-1 rounded-full bg-gray-600" />
                                            <View className="w-1 h-1 rounded-full bg-gray-400" />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View className="h-24" />
            </ScrollView>

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />
        </ScreenWrapper>
    );
}

export default BookingCalendar;
