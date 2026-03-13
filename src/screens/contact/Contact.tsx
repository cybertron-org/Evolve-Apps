import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import GlobalIcon from '../../components/common/GlobalIcon';
import { ContactSvg } from '../../assets/svg';

function Contact() {
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    const handlePhonePress = async () => {
        const phoneNumber = 'tel:+12071234567';
        try {
            const supported = await Linking.canOpenURL(phoneNumber);
            if (supported) {
                await Linking.openURL(phoneNumber);
            } else {
                Alert.alert('Error', 'Phone app is not available on this device');
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to open phone app. This feature works on real devices.');
        }
    };

    const handleEmailPress = async () => {
        const email = 'mailto:support@gmail.com';
        try {
            const supported = await Linking.canOpenURL(email);
            if (supported) {
                await Linking.openURL(email);
            } else {
                Alert.alert('Error', 'Email app is not available on this device');
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to open email app. This feature works on real devices.');
        }
    };

    const handleLocationPress = async () => {
        const location = 'Alaska, United States';
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert('Error', 'Maps app is not available on this device');
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to open maps. This feature works on real devices.');
        }
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />
              
                <View className="px-6 mt-6">
                    <AppText className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                        CONTACT US
                    </AppText>

                    <View className="items-center mb-12">
                        <ContactSvg/>
                    </View>

                    <TouchableOpacity 
                        onPress={handlePhonePress}
                        className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 mb-4 flex-row items-center"
                    >
                        <View className="w-12 h-12 rounded-full bg-[#578096] items-center justify-center mr-4">
                            <GlobalIcon name="phone" library="Feather" size={24} color="#FFFFFF" />
                        </View>
                        <AppText className="text-lg text-gray-900 dark:text-white">
                            +1207123-4567
                        </AppText>
                    </TouchableOpacity>

                    {/* Email */}
                    <TouchableOpacity 
                        onPress={handleEmailPress}
                        className="border-2 border-[#578096] rounded-2xl p-4 mb-4 flex-row items-center"
                    >
                        <View className="w-12 h-12 rounded-full bg-[#578096] items-center justify-center mr-4">
                            <GlobalIcon name="mail" library="Feather" size={24} color="#FFFFFF" />
                        </View>
                        <AppText className="text-lg text-gray-900 dark:text-white">
                            support@gmail.com
                        </AppText>
                    </TouchableOpacity>

                    {/* Location */}
                    <TouchableOpacity 
                        onPress={handleLocationPress}
                        className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 mb-4 flex-row items-center"
                    >
                        <View className="w-12 h-12 rounded-full bg-[#578096] items-center justify-center mr-4">
                            <GlobalIcon name="map-pin" library="Feather" size={24} color="#FFFFFF" />
                        </View>
                        <AppText className="text-lg text-gray-900 dark:text-white">
                            Alaska, United State
                        </AppText>
                    </TouchableOpacity>
                </View>

                <View className="h-24" />
            </ScrollView>

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />
        </ScreenWrapper>
    );
}

export default Contact;
