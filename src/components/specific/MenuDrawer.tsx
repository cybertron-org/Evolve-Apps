import React from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from '../common/GlobalIcon';

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
};

const menuItems: MenuItem[] = [
    { key: 'profile', label: 'My Profile', icon: 'user', library: 'Feather' },
    { key: 'consultation', label: 'My Consultation', icon: 'video', library: 'Feather' },
    { key: 'invoice', label: 'Invoice', icon: 'file-text', library: 'Feather' },
    { key: 'assessment', label: 'Assessment/Exercise', icon: 'clipboard', library: 'Feather' },
    { key: 'transactions', label: 'Transactions', icon: 'credit-card', library: 'Feather' },
    { key: 'about', label: 'About Evolve', icon: 'info', library: 'Feather' },
    { key: 'contact', label: 'Contact Us', icon: 'phone', library: 'Feather' },
    { key: 'faq', label: 'FAQ', icon: 'help-circle', library: 'Feather' },
    { key: 'logout', label: 'Logout', icon: 'log-out', library: 'Feather' },
];

const MenuDrawer: React.FC<MenuDrawerProps> = ({ visible, onClose, onMenuItemPress }) => {
    const { isDark } = useTheme();

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
                        className="absolute top-3 right-3 w-8 h-8 rounded-full items-center justify-center z-10"
                        style={{ backgroundColor: isDark ? '#374151' : '#F3F4F6' }}
                    >
                        <GlobalIcon name="x" library="Feather" size={18} color={isDark ? '#F1F5F9' : '#1E293B'} />
                    </TouchableOpacity>

                    {/* Menu Items */}
                    <View className="py-4">
                        {menuItems.map((item, index) => (
                            <View key={item.key}>
                                <TouchableOpacity
                                    onPress={() => {
                                        onMenuItemPress(item.key);
                                        onClose();
                                    }}
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
