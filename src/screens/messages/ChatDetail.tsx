import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import AppText from '../../components/common/AppText';
import GlobalIcon from '../../components/common/GlobalIcon';
import { useTheme } from '../../theme/ThemeContext';

const ChatDetail = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { isDark } = useTheme();
    const { name, role, avatar } = route.params || { name: 'Maximillian Jacobson', role: 'Psychologist', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' };
    const [message, setMessage] = useState('');

    const messages = [
        { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', isSent: false, time: '1 day ago' },
        { id: 2, text: 'Lorem ipsum dolor sit amet here a consectetur', isSent: false, time: '1 day ago' },
        { id: 3, text: 'Lorem ipsum dolor sit amet here a consectetur adipiscing elit', isSent: true, time: '1 min ago' },
    ];

    return (
        <ScreenWrapper scroll={false}>
            {/* Custom Header */}
            <View className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1C1C1E]">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <GlobalIcon name="chevron-left" library="Feather" size={24} color={isDark ? '#F1F5F9' : '#1E293B'} />
                </TouchableOpacity>
                <View className="flex-row items-center flex-1 ml-2">
                    <Image source={{ uri: avatar }} className="w-10 h-10 rounded-full" />
                    <View className="ml-3">
                        <AppText className="text-base font-bold text-gray-900 dark:text-white">
                            {name} <AppText className="text-red-500 font-normal text-xs">({role})</AppText>
                        </AppText>
                    </View>
                </View>
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView 
                    className="flex-1 px-4 bg-gray-50 dark:bg-[#121212]"
                    contentContainerStyle={{ paddingVertical: 20 }}
                >
                    <View className="items-center mb-6">
                        <AppText className="text-gray-400 text-xs text-center">1 day ago</AppText>
                    </View>

                    {messages.map((msg) => (
                        <View key={msg.id} className={`mb-6 ${msg.isSent ? 'items-end' : 'items-start'}`}>
                            <View className="flex-row items-end">
                                {!msg.isSent && <View className="w-2" />}
                                <View 
                                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                                        msg.isSent 
                                            ? 'bg-[#578096] rounded-tr-none' 
                                            : 'bg-white dark:bg-[#2C2C2E] border border-gray-100 dark:border-gray-700 rounded-tl-none'
                                    }`}
                                >
                                    <AppText className={`text-sm ${msg.isSent ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                                        {msg.text}
                                    </AppText>
                                    <View className="flex-row justify-end mt-1">
                                        <GlobalIcon name="check" library="Feather" size={12} color={msg.isSent ? '#E2E8F0' : '#578096'} />
                                    </View>
                                </View>
                                {msg.isSent && <View className="w-2" />}
                            </View>
                            <AppText className="text-[10px] text-gray-400 mt-1 mx-2">{msg.time}</AppText>
                        </View>
                    ))}
                </ScrollView>

                {/* Input Area */}
                <View className="flex-row items-center px-4 py-3 bg-white dark:bg-[#1C1C1E] border-t border-gray-100 dark:border-gray-800">
                    <TouchableOpacity className="p-2">
                        <GlobalIcon name="plus" library="Feather" size={24} color={isDark ? '#94A3B8' : '#64748B'} />
                    </TouchableOpacity>
                    
                    <View className="flex-1 mx-2 bg-gray-100 dark:bg-[#2C2C2E] rounded-xl px-4 py-2">
                        <TextInput
                            placeholder="Lorem ipsum dolor sit am|"
                            placeholderTextColor={isDark ? '#94A3B8' : '#94A3B8'}
                            value={message}
                            onChangeText={setMessage}
                            className="text-gray-900 dark:text-white text-sm py-1"
                            multiline
                        />
                    </View>

                    <TouchableOpacity className="p-2">
                        <GlobalIcon name="send" library="Feather" size={24} color="#578096" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

export default ChatDetail;
