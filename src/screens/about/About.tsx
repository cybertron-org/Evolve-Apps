import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, ScrollView, Image, Dimensions, Platform } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;

function About() {
    const { isDark } = useTheme();
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    return (
        <ScreenWrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Platform.OS === 'ios' ? 20 : 16}}
            >
                <Header
                    userName="Angelina"
                    onMenuPress={() => setMenuVisible(true)}
                />

                {/* Hero Image */}
                <View className="mx-4 mt-4">
                    <View
                        className="rounded-2xl overflow-hidden"
                        style={{
                            width: SCREEN_WIDTH - 32,
                            height: SCREEN_HEIGHT * 0.28}}
                    >
                        <Image
                            source={require('../../assets/images/about.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>
                </View>

                {/* Content */}
                <View className="px-6 mt-6">
                    {/* Title */}
                    <AppText
                        className="text-black dark:text-white not-italic font-bold uppercase mb-4"
                        style={{ fontSize: isSmallScreen ? 20 : 24 }}
                    >
                        ABOUT US
                    </AppText>

                    {/* Paragraph 1 */}
                    <AppText
                        className="text-gray-700 dark:text-gray-300 mb-4 leading-6"
                        style={{ fontSize: isSmallScreen ? 13 : 14 }}
                    >
                        Sed ut perspiciatis unde omnis iste natus error sit thems voluptatem accusantium doloremque laudantium, ands totam rem aperiam, eaque ipsa quae ab illo inventorud veritatis et quasi architecto beatae vitae dicta sunt for explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi froms a nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.
                    </AppText>

                    {/* Paragraph 2 */}
                    <AppText
                        className="text-gray-700 dark:text-gray-300 mb-4 leading-6"
                        style={{ fontSize: isSmallScreen ? 13 : 14 }}
                    >
                        Sed ut perspiciatis unde omnis iste natus error sit thems voluptatem accusantium doloremque laudantium, ands totam rem aperiam, eaque ipsa quae ab illo inventorud veritatis et quasi architecto beatae vitae dicta sunt for explicabo nemo enim ipsam voluptatem quia.
                    </AppText>

                    {/* Paragraph 3 */}
                    <AppText
                        className="text-gray-700 dark:text-gray-300 mb-4 leading-6"
                        style={{ fontSize: isSmallScreen ? 13 : 14 }}
                    >
                        Sed ut perspiciatis unde omnis iste natus error sit thems voluptatem accusantium doloremque laudantium, ands totam rem aperiam.
                    </AppText>
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

export default About;
