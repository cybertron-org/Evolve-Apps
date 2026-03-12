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
import { userProfile, orders, paymentCards } from '../../data/profileData';

function Profile() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [menuVisible, setMenuVisible] = useState(false);
    const [isRestoring, setIsRestoring] = useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsRestoring(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleMenuItemPress = (item: string) => {
        if (item === 'profile' && !isRestoring) {
            navigation.navigate('AddProfile');
        }
        console.log('Menu item pressed:', item);
    };

    const handleEditProfile = () => {
        if (!isRestoring) {
            navigation.navigate('AddProfile');
        }
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

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileHeader 
                    name={userProfile.name} 
                    avatar={userProfile.avatar}
                    onMenuPress={() => setMenuVisible(true)}
                />

                <ProfileAvatar 
                    avatar={userProfile.avatar}
                    onEditPress={handleEditProfile}
                />

                <View className="px-6 mb-6">
                    <ProfileInfoItem 
                        label="Full Name"
                        value={userProfile.name}
                        onEditPress={handleEditProfile}
                    />
                    <ProfileInfoItem 
                        label="Email Address"
                        value={userProfile.email}
                        onEditPress={handleEditProfile}
                    />
                    <ProfileInfoItem 
                        label="Phone Number"
                        value={userProfile.phone}
                        onEditPress={handleEditProfile}
                    />
                    <ProfileInfoItem 
                        label="Bio"
                        value={userProfile.bio}
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
            </ScrollView>

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />
        </ScreenWrapper>
    );
}

export default Profile;
