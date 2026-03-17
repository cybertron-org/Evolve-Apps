import { useMutation } from '@tanstack/react-query';
import { logoutApi } from '../../api/authApi';
import { useAuthStore } from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { createMMKV } from 'react-native-mmkv';
import { useToast } from '../useToast';

const storage = createMMKV();

export const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);
    const { showToast } = useToast();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return useMutation({
        mutationFn: () => {
            const token = useAuthStore.getState().token;
            // console.log('Initiating logout mutation. Token in store:', token ? 'Exists' : 'MISSING');
            return logoutApi();
        },
        onSettled: () => {
            logout();
            storage.remove('NAVIGATION_STATE');
            
            showToast({
                title: 'Logged Out',
                message: 'Successfully logged out of your account.',
                type: 'success',
            });

            //*** */ Navigation is handled automatically by RootNavigator based on auth state******//
        },
    });
};
