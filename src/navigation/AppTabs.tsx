import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import GlobalIcon from '../components/common/GlobalIcon';

// Screen Imports
import Home from '../screens/home/Home';
import Messages from '../screens/messages/Messages';
import Services from '../screens/services/Services';
import History from '../screens/history/History';
import Profile from '../screens/user/Profile';

// Sub-screen Imports
import ServiceDetail from '../screens/services/ServiceDetail';
import ConsultationList from '../screens/consultation/ConsultationList';
import BookingCalendar from '../screens/booking/BookingCalendar';
import Transactions from '../screens/transactions/Transactions';
import Contact from '../screens/contact/Contact';
import About from '../screens/about/About';
import Invoice from '../screens/invoice/Invoice';
import PayslipDetail from '../screens/invoice/PayslipDetail';
import Assessment from '../screens/assessment/Assessment';
import FAQ from '../screens/faq/FAQ';
import CoachProfile from '../screens/coach/CoachProfile';
import PurchaseSummary from '../screens/payment/PurchaseSummary';
import PaymentInProcess from '../screens/payment/PaymentInProcess';
import PaymentSuccess from '../screens/payment/PaymentSuccess';
import PaymentFailed from '../screens/payment/PaymentFailed';
import SessionExpired from '../screens/session/SessionExpired';
import SessionCompleted from '../screens/session/SessionCompleted';
import ConsultationHistory from '../screens/consultation/ConsultationHistory';
import ChatDetail from '../screens/messages/ChatDetail';

import { HomeSvg, MessageSvg, HistorySvg, ProfileSvg } from '../assets/svg';
import ServicesSvg from '../assets/svg/service';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// --- Nested Stacks ---

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={Home} />
    <Stack.Screen name="About" component={About} />
    <Stack.Screen name="Contact" component={Contact} />
    <Stack.Screen name="FAQ" component={FAQ} />
    <Stack.Screen name="Transactions" component={Transactions} />
    <Stack.Screen name="ConsultationList" component={ConsultationList} />
  </Stack.Navigator>
);

const MessagesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MessagesMain" component={Messages} />
    <Stack.Screen name="ChatDetail" component={ChatDetail} />
  </Stack.Navigator>
);

const ServicesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ServicesMain" component={Services} />
    <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
    <Stack.Screen name="BookingCalendar" component={BookingCalendar} />
    <Stack.Screen name="PurchaseSummary" component={PurchaseSummary} />
    <Stack.Screen name="PaymentInProcess" component={PaymentInProcess} />
    <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
    <Stack.Screen name="PaymentFailed" component={PaymentFailed} />
    <Stack.Screen name="CoachProfile" component={CoachProfile} />
  </Stack.Navigator>
);

const HistoryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HistoryMain" component={History} />
    <Stack.Screen name="ConsultationHistory" component={ConsultationHistory} />
    <Stack.Screen name="Invoice" component={Invoice} />
    <Stack.Screen name="PayslipDetail" component={PayslipDetail} />
    <Stack.Screen name="Assessment" component={Assessment} />
    <Stack.Screen name="SessionExpired" component={SessionExpired} />
    <Stack.Screen name="SessionCompleted" component={SessionCompleted} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={Profile} />
  </Stack.Navigator>
);

export const AppTabs = () => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const getTabBarHeight = () => {
    if (Platform.OS === 'ios') {
      return insets.bottom > 0 ? 65 + insets.bottom : 75;
    } else {
      return insets.bottom > 0 ? 70 + insets.bottom : 70;
    }
  };

  const getPaddingBottom = () => {
    if (Platform.OS === 'ios') {
      return insets.bottom > 0 ? insets.bottom + 5 : 10;
    } else {
      return insets.bottom > 0 ? insets.bottom + 8 : 12;
    }
  };

  const getBottomPosition = () => {
    if (Platform.OS === 'android' && insets.bottom > 0) {
      return 8;
    }
    return 0;
  };

  const tabBarHeight = getTabBarHeight();
  const paddingBottom = getPaddingBottom();
  const bottomPosition = getBottomPosition();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#578096',
        tabBarInactiveTintColor: isDark ? '#94A3B8' : '#9CA3AF',
        tabBarStyle: {
          position: 'absolute',
          bottom: bottomPosition,
          left: 8,
          right: 8,
          backgroundColor: isDark ? '#28282A' : '#FFFFFF',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderBottomLeftRadius: bottomPosition > 0 ? 24 : 0,
          borderBottomRightRadius: bottomPosition > 0 ? 24 : 0,
          borderTopColor: 'transparent',
          borderTopWidth: 0,
          height: tabBarHeight,
          paddingBottom: paddingBottom,
          paddingTop: 12,
          paddingHorizontal: 8,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <HomeSvg
              color={focused ? '#578096' : (isDark ? '#94A3B8' : '#9CA3AF')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesStack}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ focused }) => (
            <MessageSvg
              color={focused ? '#578096' : (isDark ? '#94A3B8' : '#9CA3AF')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesStack}
        options={{
          tabBarLabel: 'Services',
          tabBarIcon: ({ focused }) => (
            <ServicesSvg
              color={focused ? '#578096' : (isDark ? '#94A3B8' : '#9CA3AF')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ focused }) => (
            <HistorySvg
              color={focused ? '#578096' : (isDark ? '#94A3B8' : '#9CA3AF')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <ProfileSvg
              color={focused ? '#578096' : (isDark ? '#94A3B8' : '#9CA3AF')}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
