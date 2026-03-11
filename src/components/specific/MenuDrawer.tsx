import React from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, Switch } from 'react-native';
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
    { key: 'consultation', label: 'My Consultation', icon: 'video', library: 'Feather' },
    { key: 'invoice', label: 'Invoice', icon: 'file-text', library: 'Feather', route: 'Invoice' },
    { key: 'assessment', label: 'Assessment/Exercise', icon: 'clipboard', library: 'Feather', route: 'Assessment' },
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

    const handleMenuPress = (item: MenuItem) => {
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
                        width: 280,
                        maxHeight: '80%',
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
                        className="absolute top-3 left-3 w-8 h-8 rounded-full items-center justify-center z-10"
                        style={{ backgroundColor: isDark ? '#374151' : '#F3F4F6' }}
                    >
                        <GlobalIcon name="x" library="Feather" size={18} color={isDark ? '#F1F5F9' : '#1E293B'} />
                    </TouchableOpacity>

                    {/* Menu Items */}
                    <View className="py-8">
                        {/* Theme Toggle */}
                        <View className="px-5 py-4 flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <View className="w-10">
                                    <GlobalIcon
                                        name={isDark ? 'moon' : 'sun'}
                                        library="Feather"
                                        size={20}
                                        color={isDark ? '#94A3B8' : '#64748B'}
                                    />
                                </View>
                                <Text className="text-base text-gray-900 dark:text-white">
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
                            className="mx-5"
                            style={{
                                height: 1,
                                backgroundColor: isDark ? '#374151' : '#F3F4F6',
                            }}
                        />

                        {menuItems.map((item, index) => (
                            <View key={item.key}>
                                <TouchableOpacity
                                    onPress={() => handleMenuPress(item)}
                                    activeOpacity={0.7}
                                    className="flex-row items-center px-5 py-4"
                                >
                                    <View className="w-10">
                                        <GlobalIcon
                                            name={item.icon}
                                            library={item.library || 'Feather'}
                                            size={20}
                                            color={item.key === 'logout' ? '#EF4444' : isDark ? '#94A3B8' : '#64748B'}
                                        />
                                    </View>
                                    <Text
                                        className={`text-base ${
                                            item.key === 'logout'
                                                ? 'text-red-500'
                                                : 'text-gray-900 dark:text-white'
                                        }`}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                                {index < menuItems.length - 1 && (
                                    <View
                                        className="mx-5"
                                        style={{
                                            height: 1,
                                            backgroundColor: isDark ? '#374151' : '#F3F4F6',
                                        }}
                                    />
                                )}
                            </View>
                        ))}
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default MenuDrawer;
