import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PaymentCard } from './PaymentCard';

type Card = {
    id: string;
    cardType: string;
    lastFourDigits: string;
    expiryDate: string;
    isDefault: boolean;
};

type PaymentMethodProps = {
    cards: Card[];
    onMakeDefault: (cardId: string) => void;
    onRemove: (cardId: string) => void;
    onAddCard: () => void;
    onSave: () => void;
    onUpdate: () => void;
    onPrivacyPolicy: () => void;
};

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
    cards,
    onMakeDefault,
    onRemove,
    onAddCard,
    onSave,
    onUpdate,
    onPrivacyPolicy,
}) => {
    return (
        <View className="px-6 mb-6">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Payment Method
            </Text>

            {cards.map((card) => (
                <PaymentCard
                    key={card.id}
                    cardType={card.cardType}
                    lastFourDigits={card.lastFourDigits}
                    expiryDate={card.expiryDate}
                    isDefault={card.isDefault}
                    onMakeDefault={() => onMakeDefault(card.id)}
                    onRemove={() => onRemove(card.id)}
                />
            ))}

            <TouchableOpacity onPress={onAddCard} className="mb-6">
                <Text className="text-red-400 text-base text-right">
                    Add New Credit Card
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={onSave}
                className="rounded-full py-4 mb-4"
                style={{ backgroundColor: '#578096' }}
            >
                <Text className="text-white text-center text-lg font-bold">
                    SAVE
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={onUpdate}
                className="rounded-full py-4 mb-4"
                style={{ backgroundColor: '#1E3A5F' }}
            >
                <Text className="text-white text-center text-lg font-bold">
                    UPDATE
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPrivacyPolicy}>
                <Text className="text-gray-600 dark:text-gray-400 text-center text-base">
                    Privacy Policy
                </Text>
            </TouchableOpacity>
        </View>
    );
};
