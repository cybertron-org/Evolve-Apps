import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from '../../components/common/GlobalIcon';

type FAQItem = {
    id: number;
    question: string;
    answer: string;
};

const faqData: FAQItem[] = [
    {
        id: 1,
        question: 'Lorem ipsum dolor sit amet?',
        answer: 'Sed ut perspiciatis unde omnis iste natus error sit thems voluptatem accusantium doloremque laudantium, ands totam rem aperiam, eaque ipsa quae ab illo inventorud veritatis et quasi architecto beatae.',
    },
    {
        id: 2,
        question: 'Lorem ipsum dolor sit amet?',
        answer: 'Sed ut perspiciatis unde omnis iste natus error sit thems voluptatem accusantium doloremque laudantium, ands totam rem aperiam, eaque ipsa quae ab illo inventorud veritatis et quasi architecto beatae.',
    },
    {
        id: 3,
        question: 'Lorem ipsum dolor sit amet?',
        answer: 'Sed ut perspiciatis unde omnis iste natus error sit thems voluptatem accusantium doloremque laudantium, ands totam rem aperiam, eaque ipsa quae ab illo inventorud veritatis et quasi architecto beatae.',
    },
    {
        id: 4,
        question: 'Lorem ipsum dolor sit amet?',
        answer: 'Sed ut perspiciatis unde omnis iste natus error sit thems voluptatem accusantium doloremque laudantium, ands totam rem aperiam, eaque ipsa quae ab illo inventorud veritatis et quasi architecto beatae.',
    },
    {
        id: 5,
        question: 'Lorem ipsum dolor sit amet?',
        answer: 'Sed ut perspiciatis unde omnis iste natus error sit thems voluptatem accusantium doloremque laudantium, ands totam rem aperiam, eaque ipsa quae ab illo inventorud veritatis et quasi architecto beatae.',
    },
    {
        id: 6,
        question: 'Lorem ipsum dolor sit amet?',
        answer: 'Sed ut perspiciatis unde omnis iste natus error sit thems voluptatem accusantium doloremque laudantium, ands totam rem aperiam, eaque ipsa quae ab illo inventorud veritatis et quasi architecto beatae.',
    },
];

const FAQAccordion: React.FC<{ item: FAQItem; isOpen: boolean; onToggle: () => void; isDark: boolean }> = ({ 
    item, 
    isOpen, 
    onToggle,
    isDark 
}) => {
    const [animation] = useState(new Animated.Value(isOpen ? 1 : 0));

    React.useEffect(() => {
        Animated.timing(animation, {
            toValue: isOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isOpen]);

    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200],
    });

    const rotateInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View className="mb-4">
            <TouchableOpacity
                onPress={onToggle}
                activeOpacity={0.8}
                className={`rounded-2xl p-4 flex-row items-center justify-between ${
                    isOpen 
                        ? 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600' 
                        : 'bg-gray-50 dark:bg-gray-800'
                }`}
            >
                <Text 
                    className={`flex-1 text-base font-semibold mr-3 ${
                        isOpen ? 'text-[#7FA5B8]' : 'text-gray-900 dark:text-white'
                    }`}
                >
                    {item.question}
                </Text>
                <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                    <GlobalIcon 
                        name="chevron-down" 
                        library="Feather" 
                        size={20} 
                        color={isOpen ? '#7FA5B8' : (isDark ? '#9CA3AF' : '#6B7280')} 
                    />
                </Animated.View>
            </TouchableOpacity>

            {isOpen && (
                <Animated.View
                    style={{
                        maxHeight: heightInterpolate,
                        overflow: 'hidden',
                    }}
                >
                    <View className="bg-white dark:bg-gray-800 border-x border-b border-gray-300 dark:border-gray-600 rounded-b-2xl px-4 pb-4 pt-2">
                        <View 
                            className="mb-3" 
                            style={{ 
                                height: 1, 
                                backgroundColor: isDark ? '#4B5563' : '#E5E7EB' 
                            }} 
                        />
                        <Text className="text-sm text-gray-600 dark:text-gray-400 leading-6">
                            {item.answer}
                        </Text>
                    </View>
                </Animated.View>
            )}
        </View>
    );
};

function FAQ() {
    const { isDark } = useTheme();
    const [menuVisible, setMenuVisible] = useState(false);
    const [openId, setOpenId] = useState<number | null>(1);

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    const handleToggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />

                <View className="px-6 mt-4 mb-6">
                    <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                        FAQ'S
                    </Text>
                </View>

                <View className="px-6">
                    {faqData.map((item) => (
                        <FAQAccordion
                            key={item.id}
                            item={item}
                            isOpen={openId === item.id}
                            onToggle={() => handleToggle(item.id)}
                            isDark={isDark}
                        />
                    ))}
                </View>

                <View className="h-6" />
            </ScrollView>

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />
        </ScreenWrapper>
    );
}

export default FAQ;
