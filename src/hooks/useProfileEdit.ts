import { useState } from 'react';
import { Platform } from 'react-native';
import { useUpdateProfile } from './mutations/useUpdateProfile';
import { useToast } from './useToast';
import { Country } from '../components/specific/CountryDropdown';
import { StateItem } from '../components/specific/StateDropdown';

export const useProfileEdit = (user: any, profileData: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
    const { showToast } = useToast();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        postalCode: '',
        avatarFile: null as { uri: string; name: string; type: string } | null,
        bio: '',
        selectedCountry: null as Country | null,
        selectedState: null as StateItem | null,
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
    });

    const handleChange = (key: string, value: any) => {
        setForm(prev => ({ ...prev, [key]: value }));
        if (errors[key as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [key]: '' }));
        }
    };

    const handleCountrySelect = (country: Country) => {
        setForm(prev => ({
            ...prev,
            selectedCountry: country,
            selectedState: null,
        }));
        if (errors.country) {
            setErrors(prev => ({ ...prev, country: '' }));
        }
    };

    const handleEditProfile = () => {
        if (!user) return;
        
        const nameParts = (user.name || '').split(' ');
        setForm({
            firstName: profileData?.first_name || nameParts[0] || '',
            lastName: profileData?.last_name || nameParts.slice(1).join(' ') || '',
            phone: profileData?.phone_no || user.phone || '',
            postalCode: profileData?.postal_code || '',
            bio: user.bio || '',
            avatarFile: null,
            selectedCountry: user.country ? { name: user.country } as any : null,
            selectedState: user.state ? { name: user.state } as any : null,
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setErrors({
            firstName: '',
            lastName: '',
            phone: '',
            country: '',
        });
    };

    const handleSaveProfile = () => {
        const PHONE_REGEX = /^[+]?[\d\s\-()]{7,15}$/;
        const newErrors = {
            firstName: !form.firstName.trim() ? 'First name is required' : '',
            lastName: !form.lastName.trim() ? 'Last name is required' : '',
            phone: !form.phone ? 'Phone number is required' : !PHONE_REGEX.test(form.phone) ? 'Please enter a valid phone number' : '',
            country: !form.selectedCountry ? 'Please select a country' : '',
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error !== '')) {
            showToast({
                type: 'error',
                title: 'Form Error',
                message: 'Please fill all required fields correctly'
            });
            return;
        }

        const formData = new FormData();
        formData.append('id', user?.id || '');
        formData.append('first_name', form.firstName);
        formData.append('last_name', form.lastName);
        formData.append('phone_no', form.phone);
        if (form.selectedCountry?.name) formData.append('country', form.selectedCountry.name);
        if (form.selectedState?.name) formData.append('state', form.selectedState.name);
        formData.append('postal_code', form.postalCode);
        formData.append('bio', form.bio);

        if (form.avatarFile) {
            const imageUri = Platform.OS === 'ios' 
                ? form.avatarFile.uri.replace('file://', '') 
                : form.avatarFile.uri;

            formData.append('profile_image', {
                uri: imageUri,
                name: form.avatarFile.name,
                type: form.avatarFile.type,
            } as any);
        }

        updateProfile(formData, {
            onSuccess: () => {
                showToast({
                    type: 'success',
                    title: 'Success',
                    message: 'Profile updated successfully'
                });
                setIsEditing(false);
            },
            onError: (error: any) => {
                showToast({
                    type: 'error',
                    title: 'Error',
                    message: error.response?.data?.message || 'Something went wrong'
                });
            }
        });
    };

    return {
        isEditing,
        form,
        errors,
        isUpdating,
        handleEditProfile,
        handleCancel,
        handleSaveProfile,
        handleChange,
        handleCountrySelect,
    };
};
