import React from 'react';
import { View, Text } from 'react-native';

interface CalendarLegendProps {
    textSecondary: string;
}

const COLOR_TODAY = '#3B82F6';
const COLOR_SELECTED = '#1ABC9C';
const COLOR_BOOKED = '#FB7185';

const CalendarLegend: React.FC<CalendarLegendProps> = ({ textSecondary }) => {
    return (
        <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: 16, 
            paddingBottom: 12, 
            paddingHorizontal: 16 
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: COLOR_TODAY }} />
                <Text style={{ color: textSecondary, fontSize: 11, fontWeight: '500' }}>Today</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: COLOR_SELECTED }} />
                <Text style={{ color: textSecondary, fontSize: 11, fontWeight: '500' }}>Selected</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: COLOR_BOOKED }} />
                <Text style={{ color: textSecondary, fontSize: 11, fontWeight: '500' }}>Booked</Text>
            </View>
        </View>
    );
};

export default CalendarLegend;
