import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
    cardBorder,
}) => {
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
                <Text style={{ color: textPrimary, fontSize: 16, fontWeight: '700' }}>Booking Date</Text>
                 <Text style={{ color: textSecondary, fontSize: 15, fontWeight: '600' }}>
                    {bookingDate}
                </Text>
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
                <Text style={{ color: textPrimary, fontSize: 16, fontWeight: '700' }}>Select Time</Text>
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
                    <Text style={{ color: textPrimary, fontSize: 15, fontWeight: '600' }}>{selectedTime}</Text>
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
                <Text style={{ color: textPrimary, fontSize: 16, fontWeight: '700' }}>Select Duration</Text>
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
                    <Text style={{ color: textPrimary, fontSize: 15, fontWeight: '600' }}>{selectedDuration}</Text>
                    <GlobalIcon name="chevron-down" library="Feather" size={16} color={textSecondary} />
                </TouchableOpacity>
            </View>

            {/* Price */}
            <View style={{ alignItems: 'flex-end', paddingVertical: 16 }}>
                <Text>
                    <Text style={{ color: '#FB7185', fontSize: 28, fontWeight: '800' }}>$70
                        {/* {totalPrice}  */}
                        </Text>
                    <Text style={{ color: textSecondary, fontSize: 20, fontWeight: '400' }}>/ hrs</Text>
                </Text>
                {/* <Text style={{ color: textSecondary, fontSize: 12, marginTop: 2 }}>
                    ${pricePerHour}/hr × {selectedDuration}
                </Text> */}
            </View>
        </View>
    );
};

export default BookingDetails;
