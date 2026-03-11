import React from 'react';
import { Modal, TouchableOpacity, View, Text, FlatList } from 'react-native';

interface DropdownOption {
    label: string;
}

interface DropdownModalProps<T extends DropdownOption> {
    visible: boolean;
    options: T[];
    onSelect: (value: T) => void;
    onClose: () => void;
    isDark: boolean;
    textPrimary: string;
}

function DropdownModal<T extends DropdownOption>({
    visible,
    options,
    onSelect,
    onClose,
    isDark,
    textPrimary,
}: DropdownModalProps<T>) {
    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
            <TouchableOpacity
                style={{ 
                    flex: 1, 
                    backgroundColor: 'rgba(0,0,0,0.5)', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}
                activeOpacity={1}
                onPress={onClose}
            >
                <View style={{ 
                    backgroundColor: isDark ? '#1E2530' : '#FFFFFF', 
                    borderRadius: 16, 
                    width: '70%', 
                    maxHeight: 300, 
                    overflow: 'hidden' 
                }}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item.label}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => { 
                                    onSelect(item); 
                                    onClose(); 
                                }}
                                style={{ 
                                    paddingVertical: 14, 
                                    paddingHorizontal: 20, 
                                    borderBottomWidth: 1, 
                                    borderBottomColor: isDark ? '#2A3240' : '#F1F5F9' 
                                }}
                            >
                                <Text style={{ color: textPrimary, fontSize: 15, fontWeight: '500' }}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

export default DropdownModal;
