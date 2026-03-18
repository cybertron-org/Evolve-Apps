import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileAvatar } from '../../components/profile/ProfileAvatar';
import { ProfileInfoItem } from '../../components/profile/ProfileInfoItem';
import { OrderHistory } from '../../components/profile/OrderHistory';
import { PaymentMethod } from '../../components/profile/PaymentMethod';
import { ProfileSkeleton } from '../../components/profile/ProfileSkeleton';
import { orders, paymentCards } from '../../data/profileData';
import { useAuthStore } from '../../store/authStore';
import { useProfile } from '../../hooks/queries/useProfile';

function Profile() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { user } = useAuthStore();
    console.log("user=>", user)

    // Fetch profile data from API
    const { isLoading, profile: profileData } = useProfile(user?.id);
    console.log("profileApiData=>", profileData);

    const displayUser = profileData ? {
        ...user,
        name: `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() || profileData.name,
        profile_image: profileData.profile_image,
        bio: profileData.bio,
        phone: profileData.phone_no,
        email: profileData.email,
        country: profileData.country,
        state: profileData.state,
        postal_code: profileData.postal_code,
    } : user;

    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuItemPress = (item: string) => {
        if (item === 'profile') {
            navigation.navigate('AddProfile');
        }
        console.log('Menu item pressed:', item);
    };

    const handleEditProfile = () => {
        navigation.navigate('AddProfile');
    };

    const handleMakeDefault = (cardId: string) => {
        console.log('Make default:', cardId);
    };

    const handleRemoveCard = (cardId: string) => {
        console.log('Remove card:', cardId);
    };

    const handleAddCard = () => {
        console.log('Add new card');
    };

    const handleSave = () => {
        console.log('Save profile');
    };

    const handleUpdate = () => {
        console.log('Update profile');
    };

    const handlePrivacyPolicy = () => {
        console.log('Privacy policy');
    };

    if (isLoading) {
        return (
            <ScreenWrapper>
                <ProfileSkeleton />
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper scroll={true}>
            <ProfileHeader
                name={displayUser?.name || ''}
                avatar={displayUser?.profile_image || ''}
                onMenuPress={() => setMenuVisible(true)}
            />

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
                    value={(displayUser as any)?.phone || ''}
                    onEditPress={handleEditProfile}
                />
                <ProfileInfoItem
                    label="Country"
                    value={(displayUser as any)?.country || ''}
                    onEditPress={handleEditProfile}
                />
                <ProfileInfoItem
                    label="State"
                    value={(displayUser as any)?.state || ''}
                    onEditPress={handleEditProfile}
                />
                <ProfileInfoItem
                    label="Postal Code"
                    value={(displayUser as any)?.postal_code || ''}
                    onEditPress={handleEditProfile}
                />
                <ProfileInfoItem
                    label="Bio"
                    value={displayUser?.bio || ''}
                    onEditPress={handleEditProfile}
                    isLast
                />
            </View>

            <OrderHistory orders={orders} />

            <PaymentMethod
                cards={paymentCards}
                onMakeDefault={handleMakeDefault}
                onRemove={handleRemoveCard}
                onAddCard={handleAddCard}
                onSave={handleSave}
                onUpdate={handleUpdate}
                onPrivacyPolicy={handlePrivacyPolicy}
            />

            <View className="h-24" />

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />
        </ScreenWrapper>
    );
}

export default Profile;
