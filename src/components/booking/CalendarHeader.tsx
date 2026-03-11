import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalIcon from '../common/GlobalIcon';

interface CalendarHeaderProps {
    currentMonth: number;
    currentYear: number;
    months: string[];
    onPrevMonth: () => void;
    onNextMonth: () => void;
    isDark: boolean;
    textPrimary: string;
    textSecondary: string;
    cardBorder: string;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    currentMonth,
    currentYear,
    months,
    onPrevMonth,
    onNextMonth,
    isDark,
    textPrimary,
    textSecondary,
    cardBorder,
}) => {
    return (
        <View className="flex-row items-center justify-between px-5 pt-5 pb-4">
            <TouchableOpacity 
                onPress={onPrevMonth}
                style={{ 
                    width: 44, 
                    height: 44, 
                    borderRadius: 12, 
                    borderWidth: 1, 
                    borderColor: cardBorder, 
                    backgroundColor: isDark ? '#252D3A' : '#E8EDF3', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}
            >
                <GlobalIcon name="chevron-left" library="Feather" size={20} color={textPrimary} />
            </TouchableOpacity>
            
            <View className="items-center" style={{ minWidth: 100 }}>
                <Text style={{ color: textPrimary, fontSize: 22, fontWeight: '800', letterSpacing: 1 }}>
                    {months[currentMonth]}
                </Text>
                <Text style={{ color: textSecondary, fontSize: 13, marginTop: 1, fontWeight: '500' }}>
                    {currentYear}
                </Text>
            </View>
            
            <TouchableOpacity 
                onPress={onNextMonth}
                style={{ 
                    width: 44, 
                    height: 44, 
                    borderRadius: 12, 
                    borderWidth: 1, 
                    borderColor: cardBorder, 
                    backgroundColor: isDark ? '#252D3A' : '#E8EDF3', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}
            >
                <GlobalIcon name="chevron-right" library="Feather" size={20} color={textPrimary} />
            </TouchableOpacity>
        </View>
    );
};

export default CalendarHeader;
