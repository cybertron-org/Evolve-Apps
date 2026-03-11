import React from 'react';
import { View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import GlobalIcon from '../common/GlobalIcon';

interface ImageCarouselProps {
    images: (string | ImageSourcePropType)[];
    currentIndex: number;
    onPrevious: () => void;
    onNext: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, currentIndex, onPrevious, onNext }) => {
    const currentImage = images[currentIndex];
    
    return (
        <View className="mx-6 mt-4 mb-6 rounded-2xl overflow-hidden relative">
            <Image 
                source={typeof currentImage === 'string' ? { uri: currentImage } : currentImage} 
                className="w-full h-56" 
                resizeMode="cover" 
            />
            
            <TouchableOpacity 
                onPress={onPrevious}
                className="absolute left-4 top-1/2 -mt-5 w-10 h-10 rounded-full bg-white/80 items-center justify-center"
            >
                <GlobalIcon name="chevron-left" library="Feather" size={20} color="#1E293B" />
            </TouchableOpacity>
            
            <TouchableOpacity 
                onPress={onNext}
                className="absolute right-4 top-1/2 -mt-5 w-10 h-10 rounded-full bg-white/80 items-center justify-center"
            >
                <GlobalIcon name="chevron-right" library="Feather" size={20} color="#1E293B" />
            </TouchableOpacity>
            
            <View className="absolute bottom-3 left-0 right-0 flex-row justify-center gap-2">
                {images.map((_, i) => (
                    <View 
                        key={i} 
                        className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/50'}`} 
                    />
                ))}
            </View>
        </View>
    );
};

export default ImageCarousel;
