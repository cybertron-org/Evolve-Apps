import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppText from '../common/AppText';
import GlobalIcon from '../common/GlobalIcon';
import { useTheme } from '../../theme/ThemeContext';

interface SummaryInfoRowProps {
    label: string;
    value: string;
    onPress: () => void;
    showChevron?: boolean;
    underlineValue?: boolean;
}

export default function SummaryInfoRow({
    label,
    value,
    onPress,
    showChevron = false,
    underlineValue = false
}: SummaryInfoRowProps) {
    const { isDark } = useTheme();

    return (
        <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            paddingVertical: 16, 
            borderBottomWidth: 1, 
            borderBottomColor: isDark ? '#374151' : '#F1F5F9' 
        }}>
            <AppText style={{ fontSize: 15, fontWeight: '700', color: isDark ? '#E5E7EB' : '#111827' }}>{label}</AppText>
            <TouchableOpacity
                onPress={onPress}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                activeOpacity={0.7}
            >
                <AppText style={{ 
                    fontSize: 15, 
                    color: underlineValue ? '#578096' : (isDark ? '#9CA3AF' : '#6B7280'),
                    fontWeight: underlineValue ? '600' : '400',
                    textDecorationLine: underlineValue ? 'underline' : 'none'
                }}>
                    {value}{showChevron ? '  ▾' : ''}
                </AppText>
                <GlobalIcon name="edit-2" library="Feather" size={15} color="#578096" />
            </TouchableOpacity>
        </View>
    );
}
