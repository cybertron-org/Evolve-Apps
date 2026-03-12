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
                <Image source={{ uri: avatar }} className="w-32 h-32 rounded-full" />
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
