import React from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from './GlobalIcon';

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    placeholder = 'Search Course', 
    value, 
    onChangeText 
}) => {
    const { isDark } = useTheme();

    return (
        <View className="flex-row items-center w-96 px-4 py-3 mx-6 rounded-xl bg-gray-100 dark:bg-gray-800">
            <GlobalIcon 
                name="search" 
                library="Feather" 
                size={18} 
                color={isDark ? '#94A3B8' : '#9CA3AF'} 
            />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={isDark ? '#94A3B8' : '#9CA3AF'}
                value={value}
                onChangeText={onChangeText}
                className="flex-1 ml-2 text-gray-900 dark:text-white text-sm"
            />
        </View>
    );
};

export default SearchBar;
