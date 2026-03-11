import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
    isDark: boolean;
    textPrimary: string;
    textSecondary: string;
}

const COLOR_TODAY = '#3B82F6';
const COLOR_SELECTED = '#1ABC9C';
const COLOR_RANGE = '#FB7185';

const CalendarGrid: React.FC<CalendarGridProps> = ({
    calendarDays,
    selectedDate,
    onSelectDate,
    isDateAvailable,
    isToday,
    getDateRangeStatus,
    isDark,
    textPrimary,
    textSecondary,
}) => {
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

                const isRangeStart = rangeStatus === 'range-start';
                const isRangeEnd = rangeStatus === 'range-end';
                const isRangeMiddle = rangeStatus === 'range-middle';

                const circleBg =
                    isSelected ? COLOR_SELECTED :
                    isTodayCell ? COLOR_TODAY :
                    isRangeStart || isRangeEnd ? COLOR_RANGE :
                    'transparent';

                const textColor =
                    !item.isCurrentMonth ? (isDark ? '#3A4455' : '#CBD5E1') :
                    isSelected || isTodayCell || isRangeStart || isRangeEnd ? '#FFFFFF' :
                    isRangeMiddle ? '#FB7185' :
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
                            paddingTop: STRIP_TOP 
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
                                backgroundColor: 'rgba(190,100,100,0.40)',
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
                            zIndex: 1 
                        }}>
                            <Text style={{ 
                                fontSize: 14, 
                                fontWeight: isSelected || isTodayCell || isRangeStart || isRangeEnd ? '700' : '400', 
                                color: textColor 
                            }}>
                                {item.day}
                            </Text>
                        </View>

                        {/* Today indicator dot */}
                        {isTodayCell && !isSelected && (
                            <View style={{ 
                                width: 4, 
                                height: 4, 
                                borderRadius: 2, 
                                backgroundColor: COLOR_TODAY, 
                                marginTop: 2, 
                                zIndex: 1 
                            }} />
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CalendarGrid;
