import AppText from '../common/AppText';
import React from 'react';
import { View, TouchableOpacity, Modal, Pressable, Switch, ScrollView, Alert } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from '../common/GlobalIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import {
    ProfileManuSvg,
    ConsultationManuSvg,
    InvoiceManuSvg,
    AssessmentManuSvg,
    TranscationsManuSvg,
    AboutManuSvg,
    ContactManuSvg,
    FaqManuSvg,
    LogoutManuSvg
} from '../../assets/svg/manu';

import { useLogout } from '../../hooks/mutations/useLogout';

interface MenuDrawerProps {
    visible: boolean;
    onClose: () => void;
    onMenuItemPress: (item: string) => void;
}

type MenuItem = {
    key: string;
    label: string;
    SvgComponent: React.ComponentType<any>;
    route?: keyof RootStackParamList;
};

const menuItems: MenuItem[] = [
    { key: 'profile', label: 'My Profile', SvgComponent: ProfileManuSvg, route: 'Profile' },
    { key: 'consultation', label: 'My Consultation', SvgComponent: ConsultationManuSvg, route: 'History' },
    { key: 'invoice', label: 'Invoice', SvgComponent: InvoiceManuSvg, route: 'Invoice' },
    { key: 'assessment', label: 'Assessment / Exercise', SvgComponent: AssessmentManuSvg, route: 'Assessment' },
    { key: 'transactions', label: 'Transactions', SvgComponent: TranscationsManuSvg, route: 'Transactions' },
    { key: 'about', label: 'About Evolve', SvgComponent: AboutManuSvg, route: 'About' },
    { key: 'contact', label: 'Contact Us', SvgComponent: ContactManuSvg, route: 'Contact' },
    { key: 'faq', label: 'FAQ', SvgComponent: FaqManuSvg, route: 'FAQ' },
    { key: 'logout', label: 'Logout', SvgComponent: LogoutManuSvg },
];

const MenuDrawer: React.FC<MenuDrawerProps> = ({ visible, onClose, onMenuItemPress }) => {
    const { isDark, setThemeMode } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { mutate: logoutApiCall } = useLogout();

    const handleThemeToggle = (value: boolean) => {
        setThemeMode(value ? 'dark' : 'light');
    };

    const handleLogout = () => {
        onClose();
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => logoutApiCall()
                },
            ]
        );
    };

    const handleMenuPress = (item: MenuItem) => {
        if (item.key === 'logout') {
            onMenuItemPress(item.key);
            handleLogout();
            return;
        }

        if (item.route) {
            const homeTabScreens = ['About', 'Contact', 'FAQ', 'Transactions', 'ConsultationList'];
            const historyTabScreens = ['Assessment', 'Invoice', 'ConsultationHistory'];
            const servicesTabScreens = ['ServiceDetail', 'BookingCalendar', 'PurchaseSummary'];

            if (homeTabScreens.includes(item.route)) {
                navigation.navigate('Home', { screen: item.route });
            } else if (historyTabScreens.includes(item.route)) {
                navigation.navigate('History', { screen: item.route });
            } else if (servicesTabScreens.includes(item.route)) {
                navigation.navigate('Services', { screen: item.route });
            } else if (item.route === 'Profile') {
                navigation.navigate('Profile', { screen: 'ProfileMain' });
            } else {
                navigation.navigate(item.route as any);
            }
        }

        onMenuItemPress(item.key);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' }}
                onPress={onClose}
            >
                <View style={{ width: '90%', maxWidth: 340 }}>
                    {/* Floating Close Button */}
                    <TouchableOpacity
                        onPress={onClose}
                        style={{
                            position: 'absolute',
                            top: -24,
                            right: -12,
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            backgroundColor: '#1E2944',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 100,
                            borderWidth: 2,
                            borderColor: '#FFFFFF'
                        }}
                    >
                        <GlobalIcon name="x" library="Feather" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    {/* Main Container */}
                    <View
                        style={{
                            backgroundColor: isDark ? '#1F2937' : '#F4F7F9',
                            borderRadius: 12,
                            overflow: 'hidden',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.3,
                            shadowRadius: 20,
                            elevation: 15
                        }}
                    >
                        {/* Theme Toggle (Optional but kept for functionality) */}
                        <View
                            style={{
                                paddingHorizontal: 25,
                                paddingVertical: 12,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderBottomWidth: 1,
                                borderBottomColor: isDark ? '#374151' : '#E5E7EB'
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <GlobalIcon
                                    name={isDark ? 'moon' : 'sun'}
                                    library="Feather"
                                    size={18}
                                    color={isDark ? '#E5E7EB' : '#64748B'}
                                />
                                <AppText style={{ fontSize: 14, fontWeight: '600', color: isDark ? '#E5E7EB' : '#1E3A5F', marginLeft: 10 }}>
                                    {isDark ? 'Dark Mode' : 'Light Mode'}
                                </AppText>
                            </View>
                            <Switch
                                value={isDark}
                                onValueChange={handleThemeToggle}
                                trackColor={{ false: '#D1D5DB', true: '#578096' }}
                                thumbColor="#FFFFFF"
                                ios_backgroundColor="#D1D5DB"
                                style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                            />
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                            {menuItems.map((item, index) => (
                                <View key={item.key}>
                                    <TouchableOpacity
                                        onPress={() => handleMenuPress(item)}
                                        activeOpacity={0.7}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                            paddingVertical: 18,
                                            backgroundColor: isDark ? '#1F2937' : '#F4F7F9'
                                        }}
                                    >
                                        <View style={{ width: 32, alignItems: 'center' }}>
                                            <item.SvgComponent
                                                width={22}
                                                height={22}
                                                color={isDark ? '#E5E7EB' : '#374151'}
                                            />
                                        </View>
                                        <AppText
                                            style={{
                                                fontSize: 16,
                                                fontWeight: '600',
                                                color: isDark ? '#E5E7EB' : '#374151',
                                                marginLeft: 12,
                                                flexShrink: 1
                                            }}
                                            numberOfLines={1}
                                        >
                                            {item.label}
                                        </AppText>
                                    </TouchableOpacity>
                                    {index < menuItems.length - 1 && (
                                        <View
                                            style={{
                                                height: 1,
                                                backgroundColor: isDark ? '#374151' : '#E5E7EB'
                                            }}
                                        />
                                    )}
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};


export default MenuDrawer;
