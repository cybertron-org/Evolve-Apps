import React from 'react';
import { View } from 'react-native';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileInfoItem } from './ProfileInfoItem';

interface ProfileViewSectionProps {
    displayUser: any;
    handleEditProfile: () => void;
}

export const ProfileViewSection: React.FC<ProfileViewSectionProps> = ({
    displayUser,
    handleEditProfile,
}) => {
    return (
        <>
            <ProfileAvatar
                avatar={displayUser?.profile_image || ''}
                onEditPress={handleEditProfile}
            />

            <View className="px-6 mb-6">
                <ProfileInfoItem
                    label="Full Name"
                    value={displayUser?.name || ''}
                    onEditPress={handleEditProfile}
                />
                <ProfileInfoItem
                    label="Email Address"
                    value={displayUser?.email || ''}
                    onEditPress={handleEditProfile}
                />
                <ProfileInfoItem
                    label="Phone Number"
                    value={displayUser?.phone || ''}
                    onEditPress={handleEditProfile}
                />
                <ProfileInfoItem
                    label="Bio"
                    value={displayUser?.bio || ''}
                    onEditPress={handleEditProfile}
                    isLast
                />
            </View>
        </>
    );
};
