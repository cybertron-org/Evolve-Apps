import AppText from '../common/AppText';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import GlobalIcon from '../common/GlobalIcon';

interface BookingDetailsProps {
    bookingDate: string;
    selectedTime: string;
    selectedDuration: string;
    totalPrice: number;
    pricePerHour: number;
    onTimePress: () => void;
    onDurationPress: () => void;
    textPrimary: string;
    textSecondary: string;
    cardBorder: string;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
    bookingDate,
    selectedTime,
    selectedDuration,
    totalPrice,
    pricePerHour,
    onTimePress,
    onDurationPress,
    textPrimary,
    textSecondary,
    cardBorder}) => {
    return (
        <View className="px-6 mb-6">
            {/* Booking Date */}
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                paddingVertical: 16, 
                borderBottomWidth: 1, 
                borderBottomColor: cardBorder 
            }}>
                <AppText style={{ color: textPrimary, fontSize: 16, fontWeight: '700' }}>Booking Date</AppText>
                 <AppText style={{ color: textSecondary, fontSize: 15, fontWeight: '600' }}>
                    {bookingDate}
                </AppText>
            </View>

            {/* Select Time */}
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                paddingVertical: 16, 
                borderBottomWidth: 1, 
                borderBottomColor: cardBorder 
            }}>
                <AppText style={{ color: textPrimary, fontSize: 16, fontWeight: '700' }}>Select Time</AppText>
                <TouchableOpacity 
                    onPress={onTimePress}
                    style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        gap: 4, 
                        borderBottomWidth: 1, 
                        borderBottomColor: textSecondary, 
                        paddingBottom: 2, 
                        minWidth: 110, 
                        justifyContent: 'flex-end' 
                    }}
                >
                    <AppText style={{ color: textPrimary, fontSize: 15, fontWeight: '600' }}>{selectedTime}</AppText>
                    <GlobalIcon name="chevron-down" library="Feather" size={16} color={textSecondary} />
                </TouchableOpacity>
            </View>

            {/* Select Duration */}
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                paddingVertical: 16, 
                borderBottomWidth: 1, 
                borderBottomColor: cardBorder 
            }}>
                <AppText style={{ color: textPrimary, fontSize: 16, fontWeight: '700' }}>Select Duration</AppText>
                <TouchableOpacity 
                    onPress={onDurationPress}
                    style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        gap: 4, 
                        borderBottomWidth: 1, 
                        borderBottomColor: textSecondary, 
                        paddingBottom: 2, 
                        minWidth: 110, 
                        justifyContent: 'flex-end' 
                    }}
                >
                    <AppText style={{ color: textPrimary, fontSize: 15, fontWeight: '600' }}>{selectedDuration}</AppText>
                    <GlobalIcon name="chevron-down" library="Feather" size={16} color={textSecondary} />
                </TouchableOpacity>
            </View>

            {/* Price */}
            <View style={{ alignItems: 'flex-end', paddingVertical: 16 }}>
                <AppText>
                    <AppText style={{ color: '#FB7185', fontSize: 28, fontWeight: '800' }}>$70
                        {/* {totalPrice}  */}
                        </AppText>
                    <AppText style={{ color: textSecondary, fontSize: 20, fontWeight: '400' }}>/ hrs</AppText>
                </AppText>
                {/* <AppText style={{ color: textSecondary, fontSize: 12, marginTop: 2 }}>
                    ${pricePerHour}/hr × {selectedDuration}
                </AppText> */}
            </View>
        </View>
    );
};

export default BookingDetails;
