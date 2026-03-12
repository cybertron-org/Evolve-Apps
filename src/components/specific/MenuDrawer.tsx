import React from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, Switch, ScrollView, Alert } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from '../common/GlobalIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

interface MenuDrawerProps {
    visible: boolean;
    onClose: () => void;
    onMenuItemPress: (item: string) => void;
}

type MenuItem = {
    key: string;
    label: string;
    icon: string;
    library?: 'Feather' | 'MaterialIcons' | 'FontAwesome';
    route?: keyof RootStackParamList;
};

const menuItems: MenuItem[] = [
    { key: 'profile', label: 'My Profile', icon: 'user', library: 'Feather', route: 'Profile' },
    { key: 'consultation', label: 'My Consultation', icon: 'video', library: 'Feather', route: 'ConsultationList' },
    { key: 'invoice', label: 'Invoice', icon: 'file-text', library: 'Feather', route: 'Invoice' },
    { key: 'assessment', label: 'Assessment / Exercise', icon: 'clipboard', library: 'Feather', route: 'Assessment' },
    { key: 'transactions', label: 'Transactions', icon: 'credit-card', library: 'Feather', route: 'Transactions' },
    { key: 'about', label: 'About Evolve', icon: 'info', library: 'Feather', route: 'About' },
    { key: 'contact', label: 'Contact Us', icon: 'phone', library: 'Feather', route: 'Contact' },
    { key: 'faq', label: 'FAQ', icon: 'help-circle', library: 'Feather', route: 'FAQ' },
    { key: 'logout', label: 'Logout', icon: 'log-out', library: 'Feather' },
];

const MenuDrawer: React.FC<MenuDrawerProps> = ({ visible, onClose, onMenuItemPress }) => {
    const { isDark, setThemeMode } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
                    onPress: () => {
                        // Reset navigation stack and go to Auth screen
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Auth' }],
                        });
                    },
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
            navigation.navigate(item.route as any);
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
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                onPress={onClose}
            >
                <Pressable
                    style={{
                        position: 'absolute',
                        top: 80,
                        right: 16,
                        width: 300,
                        maxHeight: '85%',
                        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                        borderRadius: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.2,
                        shadowRadius: 16,
                        elevation: 12,
                        overflow: 'hidden',
                    }}
                    onPress={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <TouchableOpacity
                        onPress={onClose}
                        style={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isDark ? '#374151' : '#F3F4F6',
                            zIndex: 10,
                        }}
                    >
                        <GlobalIcon name="x" library="Feather" size={18} color={isDark ? '#F1F5F9' : '#1E293B'} />
                    </TouchableOpacity>

                    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                        <View style={{ paddingVertical: 32 }}>
                            {/* Theme Toggle */}
                            <View
                                style={{
                                    paddingHorizontal: 20,
                                    paddingVertical: 14,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 40 }}>
                                        <GlobalIcon
                                            name={isDark ? 'moon' : 'sun'}
                                            library="Feather"
                                            size={20}
                                            color={isDark ? '#94A3B8' : '#64748B'}
                                        />
                                    </View>
                                    <Text style={{ fontSize: 16, color: isDark ? '#FFFFFF' : '#111827' }}>
                                        {isDark ? 'Dark Mode' : 'Light Mode'}
                                    </Text>
                                </View>
                                <Switch
                                    value={isDark}
                                    onValueChange={handleThemeToggle}
                                    trackColor={{ false: '#D1D5DB', true: '#578096' }}
                                    thumbColor={isDark ? '#FFFFFF' : '#F3F4F6'}
                                    ios_backgroundColor="#D1D5DB"
                                />
                            </View>

                            {/* Divider */}
                            <View
                                style={{
                                    marginHorizontal: 20,
                                    height: 1,
                                    backgroundColor: isDark ? '#374151' : '#F3F4F6',
                                }}
                            />

                            {menuItems.map((item, index) => (
                                <View key={item.key}>
                                    <TouchableOpacity
                                        onPress={() => handleMenuPress(item)}
                                        activeOpacity={0.7}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                            paddingVertical: 14,
                                        }}
                                    >
                                        <View style={{ width: 40 }}>
                                            <GlobalIcon
                                                name={item.icon}
                                                library={item.library || 'Feather'}
                                                size={20}
                                                color={
                                                    item.key === 'logout'
                                                        ? '#EF4444'
                                                        : isDark
                                                        ? '#94A3B8'
                                                        : '#64748B'
                                                }
                                            />
                                        </View>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color:
                                                    item.key === 'logout'
                                                        ? '#EF4444'
                                                        : isDark
                                                        ? '#FFFFFF'
                                                        : '#111827',
                                                flexShrink: 1,
                                            }}
                                            numberOfLines={1}
                                        >
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                    {index < menuItems.length - 1 && (
                                        <View
                                            style={{
                                                marginHorizontal: 20,
                                                height: 1,
                                                backgroundColor: isDark ? '#374151' : '#F3F4F6',
                                            }}
                                        />
                                    )}
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default MenuDrawer;
