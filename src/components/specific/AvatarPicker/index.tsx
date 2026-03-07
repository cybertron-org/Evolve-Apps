import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useTheme } from '../../../theme/ThemeContext';
import AvatarDisplay from './AvatarDisplay';
import ImagePickerModal from './ImagePickerModal';

interface Props {
    initialUri?: string;
    onImageSelected?: (base64: string, uri: string) => void;
    size?: number;
}

const AvatarPicker: React.FC<Props> = ({
    initialUri,
    onImageSelected,
    size = 96,
}) => {
    const { isDark } = useTheme();
    const [imageUri, setImageUri] = useState<string | null>(initialUri ?? null);
    const [loading, setLoading] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [avatarLayout, setAvatarLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const imageOptions = {
        mediaType: 'photo' as const,
        includeBase64: true,
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8 as const,
        selectionLimit: 1,
    };

    const cameraOptions = {
        mediaType: 'photo' as const,
        includeBase64: true,
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8 as const,
        saveToPhotos: false,
        cameraType: 'back' as const,
    };

    const openGallery = () => {
        setDropdownVisible(false);
        setTimeout(() => {
            setLoading(true);
            launchImageLibrary(imageOptions, (response) => {
                setLoading(false);
                if (response.didCancel || response.errorCode) return;
                const asset = response.assets?.[0];
                if (!asset) return;
                setImageUri(asset.uri ?? '');
                onImageSelected?.(asset.base64 ?? '', asset.uri ?? '');
            });
        }, 300);
    };

    const openCamera = () => {
        setDropdownVisible(false);

        setTimeout(() => {
            setLoading(true);
            launchCamera(cameraOptions, (response) => {
                setLoading(false);

                if (response.didCancel) {
                    console.log('User cancelled camera');
                    return;
                }

                if (response.errorCode) {
                    console.error('Camera error:', response.errorCode, response.errorMessage);

                    let errorMsg = 'Failed to open camera. Please try again.';
                    if (response.errorCode === 'camera_unavailable') {
                        errorMsg = 'Camera is not available on this device.';
                    } else if (response.errorCode === 'permission') {
                        errorMsg = 'Camera permission is required. Please enable it in settings.';
                    }

                    Alert.alert('Camera Error', errorMsg, [{ text: 'OK' }]);
                    return;
                }

                const asset = response.assets?.[0];
                if (!asset) {
                    console.log('No asset returned from camera');
                    return;
                }

                console.log('Camera photo captured:', asset.uri);
                setImageUri(asset.uri ?? '');
                onImageSelected?.(asset.base64 ?? '', asset.uri ?? '');
            });
        }, 300);
    };

    const removeImage = () => {
        setDropdownVisible(false);
        setImageUri(null);
        onImageSelected?.('', '');
    };

    const handleLayout = (e: any) => {
        e.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            setAvatarLayout({ x: pageX, y: pageY, width, height });
        });
    };

    return (
        <View style={{ alignSelf: 'center' }}>
            <AvatarDisplay
                size={size}
                imageUri={imageUri}
                loading={loading}
                isDark={isDark}
                onPress={() => setDropdownVisible(true)}
                onLayout={handleLayout}
            />

            <ImagePickerModal
                visible={dropdownVisible}
                onClose={() => setDropdownVisible(false)}
                onGallery={openGallery}
                onCamera={openCamera}
                onRemove={removeImage}
                hasImage={!!imageUri}
                isDark={isDark}
                avatarLayout={avatarLayout}
            />
        </View>
    );
};

export default AvatarPicker;
