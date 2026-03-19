import { useQuery } from '@tanstack/react-query';
import { getProfileApi } from '../../api/authApi';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';

export const useProfile = (id: string | number | undefined) => {
  const { user: storeUser, setUser } = useAuthStore();

  const query = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfileApi(id!),
    enabled: !!id,
  });

  const profileData = query.data?.data;

  useEffect(() => {
    if (profileData) {
        const currentUser = useAuthStore.getState().user;
        
        console.log('useProfile: Updating store with API data', {
            apiEmail: profileData.email,
            storeEmail: currentUser?.email,
            storeId: currentUser?.id
        });
        
        setUser({
            ...currentUser, // Preserving latest data
            id: profileData.id.toString(),
            email: profileData.email || currentUser?.email,
            name: `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() || profileData.name || currentUser?.name,
            profile_image: profileData.profile_image || currentUser?.profile_image,
            bio: profileData.bio || currentUser?.bio,
            phone: profileData.phone_no || currentUser?.phone,
            profile_completed: profileData.profile_completed,
        } as any);
    }
  }, [profileData, setUser]);

  return {
    ...query,
    profile: profileData
  };
};
