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
        console.log('useProfile: Updating store with API data', {
            apiEmail: profileData.email,
            storeEmail: storeUser?.email
        });
        
        setUser({
            ...storeUser, // Preserving existing data
            id: profileData.id.toString(),
            email: profileData.email || storeUser?.email, // Fallback to store email if API misses it
            name: `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() || profileData.name || storeUser?.name,
            profile_image: profileData.profile_image || storeUser?.profile_image,
            bio: profileData.bio || storeUser?.bio,
            phone: profileData.phone_no || storeUser?.phone,
            profile_completed: profileData.profile_completed,
        } as any);
    }
  }, [profileData, setUser]); // Removed storeUser from deps to avoid loop, but using it inside

  return {
    ...query,
    profile: profileData
  };
};
