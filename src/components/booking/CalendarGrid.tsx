import AppText from '../common/AppText';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CalendarDay {
    day: number;
    isCurrentMonth: boolean;
}

interface CalendarGridProps {
    calendarDays: CalendarDay[];
    selectedDate: number | null;
    onSelectDate: (day: number) => void;
    isDateAvailable: (day: number) => boolean;
    isToday: (day: number) => boolean;
    getDateRangeStatus: (day: number) => string | null;
    hasSingleBooking?: (day: number) => boolean;
    isWeeklyDay?: (day: number) => boolean;
    isDark: boolean;
    textPrimary: string;
    textSecondary: string;
}

const COLOR_TODAY = '#3B82F6';
const COLOR_SELECTED = '#1ABC9C';
const COLOR_RANGE = '#FB7185';
const COLOR_CUSTOM = '#F59E0B'; // Amber for custom dates

const CalendarGrid: React.FC<CalendarGridProps> = ({
    calendarDays,
    selectedDate,
    onSelectDate,
    isDateAvailable,
    isToday,
    getDateRangeStatus,
    hasSingleBooking,
    isWeeklyDay,
    isDark,
    textPrimary,
    textSecondary }) => {
    const CELL_H = 54;
    const CIRCLE = 36;
    const STRIP_TOP = 4;

    return (
        <View className="flex-row flex-wrap px-2 pb-5">
            {calendarDays.map((item, index) => {
                const isAvailable = item.isCurrentMonth && isDateAvailable(item.day);
                const isSelected = item.isCurrentMonth && selectedDate === item.day;
                const isTodayCell = item.isCurrentMonth && isToday(item.day);
                const rangeStatus = item.isCurrentMonth ? getDateRangeStatus(item.day) : null;
                const isSingleBooking = item.isCurrentMonth && hasSingleBooking ? hasSingleBooking(item.day) : false;
                const isWeekly = item.isCurrentMonth && isWeeklyDay ? isWeeklyDay(item.day) : false;

                const isRangeStart = rangeStatus === 'range-start';
                const isRangeEnd = rangeStatus === 'range-end';
                const isRangeMiddle = rangeStatus === 'range-middle';

                const isBothWeeklyCustom = isWeekly && isSingleBooking;
                const isTodayWeekly = isTodayCell && isWeekly && !isSingleBooking;
                const isTodayCustom = isTodayCell && isSingleBooking && !isWeekly;
                // If all three, we'll just show Today + Weekly for simplicity in 50/50
                const isTodayBoth = isTodayCell && isWeekly && isSingleBooking;

                const hasOverlap = isBothWeeklyCustom || isTodayWeekly || isTodayCustom || isTodayBoth;

                const circleBg =
                    isSelected ? COLOR_SELECTED :
                        hasOverlap ? 'transparent' :
                            isTodayCell ? COLOR_TODAY :
                                isRangeStart || isRangeEnd || isWeekly ? COLOR_RANGE :
                                    isSingleBooking ? COLOR_CUSTOM :
                                        'transparent';

                const textColor =
                    !item.isCurrentMonth ? (isDark ? '#3A4455' : '#CBD5E1') :
                        isSelected || isTodayCell || isRangeStart || isRangeEnd || isWeekly || isSingleBooking ? '#FFFFFF' :
                            isRangeMiddle ? (isDark ? '#CBD5E1' : '#000') :
                                isAvailable ? textPrimary :
                                    textSecondary;

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => { if (item.isCurrentMonth && isAvailable) onSelectDate(item.day); }}
                        disabled={!item.isCurrentMonth || !isAvailable}
                        style={{
                            width: '14.28%',
                            height: CELL_H,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            paddingTop: STRIP_TOP,
                            opacity: item.isCurrentMonth && isAvailable ? 1 : 0.5
                        }}
                    >
                        {/* Range strip */}
                        {(isRangeStart || isRangeEnd || isRangeMiddle) && (
                            <View style={{
                                position: 'absolute',
                                top: STRIP_TOP,
                                height: CIRCLE,
                                left: isRangeStart ? '50%' : 0,
                                right: isRangeEnd ? '50%' : 0,
                                backgroundColor: 'rgba(190,100,100,0.40)'
                            }} />
                        )}

                        {/* Date circle */}
                        <View style={{
                            width: CIRCLE,
                            height: CIRCLE,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: circleBg,
                            zIndex: 1,
                            overflow: 'hidden'
                        }}>
                            {hasOverlap && !isSelected && (
                                <LinearGradient
                                    colors={
                                        isTodayBoth ? [COLOR_TODAY, COLOR_TODAY, COLOR_RANGE, COLOR_RANGE] : // Pick 2 for 50/50
                                            isTodayWeekly ? [COLOR_TODAY, COLOR_TODAY, COLOR_RANGE, COLOR_RANGE] :
                                                isTodayCustom ? [COLOR_TODAY, COLOR_TODAY, COLOR_CUSTOM, COLOR_CUSTOM] :
                                                    [COLOR_RANGE, COLOR_RANGE, COLOR_CUSTOM, COLOR_CUSTOM]
                                    }
                                    locations={[0, 0.5, 0.5, 1]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                />
                            )}
                            <AppText style={{
                                fontSize: 14,
                                fontWeight: isSelected || isTodayCell || isRangeStart || isRangeEnd || isWeekly || isSingleBooking ? '700' : '400',
                                color: textColor
                            }}>
                                {item.day}
                            </AppText>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CalendarGrid;
