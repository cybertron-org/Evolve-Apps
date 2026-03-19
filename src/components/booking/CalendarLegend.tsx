import AppText from '../common/AppText';
import React from 'react';
import { View} from 'react-native';

interface CalendarLegendProps {
    textSecondary: string;
}

const COLOR_TODAY = '#3B82F6';
const COLOR_SELECTED = '#1ABC9C';
const COLOR_WEEKLY = '#FB7185';
const COLOR_CUSTOM = '#F59E0B';

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
                <AppText style={{ color: textSecondary, fontSize: 11, fontWeight: '500' }}>Today</AppText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: COLOR_SELECTED }} />
                <AppText style={{ color: textSecondary, fontSize: 11, fontWeight: '500' }}>Selected</AppText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: COLOR_WEEKLY }} />
                <AppText style={{ color: textSecondary, fontSize: 11, fontWeight: '500' }}>Weekly</AppText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: COLOR_CUSTOM }} />
                <AppText style={{ color: textSecondary, fontSize: 11, fontWeight: '500' }}>Special Date</AppText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ 
                    width: 10, 
                    height: 10, 
                    borderRadius: 3, 
                    overflow: 'hidden', 
                    flexDirection: 'row' 
                }}>
                    <View style={{ flex: 1, backgroundColor: COLOR_WEEKLY }} />
                    <View style={{ flex: 1, backgroundColor: COLOR_CUSTOM }} />
                </View>
                <AppText style={{ color: textSecondary, fontSize: 11, fontWeight: '500' }}>Both</AppText>
            </View>
        </View>
    );
};

export default CalendarLegend;
