import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import GlobalIcon from '../common/GlobalIcon';

type ProfileAvatarProps = {
    avatar: string;
    onEditPress: () => void;
};

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ avatar, onEditPress }) => {
    return (
        <View className="items-center mb-6">
            <View className="relative">
                <View className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {avatar ? (
                        <Image 
                            source={{ 
                                uri: avatar.startsWith('http') || avatar.startsWith('data:') 
                                    ? avatar 
                                    : `data:image/jpeg;base64,${avatar}` 
                            }} 
                            className="w-full h-full" 
                        />
                    ) : (
                        <View className="w-full h-full items-center justify-center">
                            <GlobalIcon name="user" library="Feather" size={48} color="#9CA3AF" />
                        </View>
                    )}
                </View>
                <TouchableOpacity
                    onPress={onEditPress}
                    className="absolute bottom-0 right-0 w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#1E3A5F' }}
                >
                    <GlobalIcon name="edit-2" library="Feather" size={18} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
