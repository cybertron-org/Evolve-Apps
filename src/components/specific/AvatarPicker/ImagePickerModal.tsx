import React from 'react';
import { Modal, Pressable, View, Text, TouchableOpacity } from 'react-native';
import GlobalIcon from '../../common/GlobalIcon';

interface ImagePickerModalProps {
    visible: boolean;
    onClose: () => void;
    onGallery: () => void;
    onCamera: () => void;
    onRemove?: () => void;
    hasImage: boolean;
    isDark: boolean;
    avatarLayout: { x: number; y: number; width: number; height: number };
}

const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
    visible,
    onClose,
    onGallery,
    onCamera,
    onRemove,
    hasImage,
    isDark,
    avatarLayout,
}) => {
    const menuBg = isDark ? '#1F2937' : '#FFFFFF';
    const menuBorder = isDark ? '#374151' : '#E5E7EB';
    const textColor = isDark ? '#F1F5F9' : '#1E293B';
    const divider = isDark ? '#374151' : '#F3F4F6';

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={{ flex: 1 }} onPress={onClose}>
                <View
                    style={{
                        position: 'absolute',
                        top: avatarLayout.y + avatarLayout.height + 8,
                        left: avatarLayout.x - (190 - avatarLayout.width) / 2,
                        width: 190,
                        backgroundColor: menuBg,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: menuBorder,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.15,
                        shadowRadius: 12,
                        elevation: 10,
                        overflow: 'hidden',
                    }}
                >
                    <TouchableOpacity
                        onPress={onGallery}
                        activeOpacity={0.7}
                        style={{
                            paddingVertical: 13,
                            paddingHorizontal: 16,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        <GlobalIcon name="image" library="Feather" size={16} color="#578096" />
                        <Text style={{ color: textColor, fontSize: 13, fontWeight: '500' }}>
                            Choose from Gallery
                        </Text>
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: divider }} />

                    <TouchableOpacity
                        onPress={onCamera}
                        activeOpacity={0.7}
                        style={{
                            paddingVertical: 13,
                            paddingHorizontal: 16,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        <GlobalIcon name="camera" library="Feather" size={16} color="#578096" />
                        <Text style={{ color: textColor, fontSize: 13, fontWeight: '500' }}>
                            Take a Photo
                        </Text>
                    </TouchableOpacity>

                    {hasImage && onRemove && (
                        <>
                            <View style={{ height: 1, backgroundColor: divider }} />
                            <TouchableOpacity
                                onPress={onRemove}
                                activeOpacity={0.7}
                                style={{
                                    paddingVertical: 13,
                                    paddingHorizontal: 16,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10,
                                }}
                            >
                                <GlobalIcon name="trash-2" library="Feather" size={16} color="#e74c3c" />
                                <Text style={{ color: '#e74c3c', fontSize: 13, fontWeight: '500' }}>
                                    Remove Photo
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </Pressable>
        </Modal>
    );
};

export default ImagePickerModal;
