import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '../common/Skeleton';

export const ProfileSkeleton: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Header Skeleton */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <View className="flex-row items-center gap-3">
          <Skeleton width={48} height={48} variant="circle" />
          <View className="gap-2">
            <Skeleton width={40} height={12} variant="text" />
            <Skeleton width={100} height={16} variant="text" />
          </View>
        </View>
        <Skeleton width={24} height={24} variant="rect" />
      </View>

      {/* Avatar Skeleton */}
      <View className="items-center mb-6">
        <View className="relative">
          <Skeleton width={128} height={128} variant="circle" />
        </View>
      </View>

      {/* Info Items Skeleton */}
      <View className="px-6 mb-6 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <View key={i} className="flex-row items-center justify-between py-1">
             <View className="gap-2 flex-1">
               <Skeleton width={80} height={12} variant="text" />
               <Skeleton width="90%" height={16} variant="text" />
             </View>
             <Skeleton width={20} height={20} variant="rect" />
          </View>
        ))}
      </View>

      {/* Order History Skeleton Title */}
      <View className="px-6 mb-4">
        <Skeleton width={120} height={20} variant="text" />
      </View>
      
      {/* Order Cards Skeleton */}
      <View className="px-6 mb-6 gap-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} width="100%" height={100} variant="rect" />
        ))}
      </View>

      {/* Payment Method Skeleton Title */}
      <View className="px-6 mb-4">
        <Skeleton width={150} height={20} variant="text" />
      </View>

      {/* Payment Cards Skeleton */}
      <View className="px-6 mb-6 gap-4">
        <Skeleton width="100%" height={80} variant="rect" />
      </View>
    </ScrollView>
  );
};

export default ProfileSkeleton;
