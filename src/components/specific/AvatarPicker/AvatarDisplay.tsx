import React from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import GlobalIcon from '../../common/GlobalIcon';

interface AvatarDisplayProps {
    size: number;
    imageUri: string | null;
    loading: boolean;
    isDark: boolean;
    onPress: () => void;
    onLayout: (event: any) => void;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
    size,
    imageUri,
    loading,
    isDark,
    onPress,
    onLayout,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={{ width: size, height: size }}
            onLayout={onLayout}
        >
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: isDark ? '#374151' : '#E5E7EB',
                    backgroundColor: isDark ? '#28282A' : '#F3F4F6',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {loading ? (
                    <ActivityIndicator color={isDark ? '#BDC3C7' : '#578096'} />
                ) : imageUri ? (
                    <Image
                        source={{ 
                            uri: imageUri.startsWith('http') || 
                                 imageUri.startsWith('data:') || 
                                 imageUri.startsWith('file://') || 
                                 imageUri.startsWith('/')
                                ? imageUri 
                                : `data:image/jpeg;base64,${imageUri}` 
                        }}
                        style={{ width: size, height: size }}
                        resizeMode="cover"
                    />
                ) : (
                    <GlobalIcon
                        name="user"
                        library="Feather"
                        size={size * 0.4}
                        color={isDark ? '#94A3B8' : '#9CA3AF'}
                    />
                )}
            </View>

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: '#578096',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: isDark ? '#111827' : '#fff',
                }}
            >
                <GlobalIcon
                    name={imageUri ? 'edit-2' : 'camera'}
                    library="Feather"
                    size={14}
                    color="#fff"
                />
            </View>
        </TouchableOpacity>
    );
};

export default AvatarDisplay;
