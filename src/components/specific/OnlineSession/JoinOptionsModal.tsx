import React from 'react';
import { Modal, Pressable, View, TouchableOpacity } from 'react-native';
import AppText from '../../../components/common/AppText';
import GlobalIcon from '../../../components/common/GlobalIcon';

interface JoinOptionsModalProps {
    visible: boolean;
    isDark: boolean;
    onClose: () => void;
    onJoinViaApp: () => void;
    onJoinViaBrowser: () => void;
}

const JoinOptionsModal: React.FC<JoinOptionsModalProps> = ({
    visible,
    isDark,
    onClose,
    onJoinViaApp,
    onJoinViaBrowser
}) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable 
                className="flex-1 bg-black/50 justify-center items-center px-6"
                onPress={onClose}
            >
                <Pressable 
                    className="bg-white dark:bg-gray-900 w-full rounded-3xl p-6"
                    onPress={(e) => e.stopPropagation()}
                >
                    <AppText className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
                        Join Meeting
                    </AppText>
                    
                    <TouchableOpacity 
                        onPress={onJoinViaApp}
                        className="flex-row items-center bg-[#1E3A5F] rounded-2xl p-4 mb-4"
                    >
                        <View className="bg-white/10 p-3 rounded-xl">
                            <GlobalIcon name="video" library="Feather" size={24} color="#FFFFFF" />
                        </View>
                        <View className="ml-4">
                            <AppText className="text-white font-bold text-base">Zoom App</AppText>
                            <AppText className="text-white/70 text-xs">Best for mobile experience</AppText>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={onJoinViaBrowser}
                        className="flex-row items-center border border-gray-200 dark:border-gray-700 rounded-2xl p-4 mb-6"
                    >
                        <View className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">
                            <GlobalIcon name="globe" library="Feather" size={24} color={isDark ? '#F1F5F9' : '#1E3A5F'} />
                        </View>
                        <View className="ml-4">
                            <AppText className="text-gray-900 dark:text-white font-bold text-base">Web Browser</AppText>
                            <AppText className="text-gray-500 dark:text-gray-400 text-xs">Join without installing app</AppText>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={onClose}
                        className="py-2"
                    >
                        <AppText className="text-gray-500 dark:text-gray-400 text-center font-semibold">
                            Cancel
                        </AppText>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default JoinOptionsModal;
