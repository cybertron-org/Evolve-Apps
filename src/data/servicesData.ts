import { ImageSourcePropType } from 'react-native';

export type ServiceData = {
    id: number;
    title: string;
    description: string;
    fee: string;
    images: (string | ImageSourcePropType)[];
    thumbnail: string | ImageSourcePropType;
};

export const SERVICES_DATA: ServiceData[] = [
    {
        id: 1,
        title: 'Executive Coaching Session',
        description: 'Our coaches are passionate about connecting with their customers to understand their needs and their unique strengths. Our coaches empower and develop their customers in a sustainable and measurable way. Often closing the gap between where one is and their goals, is the motivation. With a coach\'s support one can develop a wholesome emotional intelligence, cultivate resilience and improve their interpersonal skills to influence professional growth. Our coaches have backgrounds in counseling psychology, clinical social work, rehabilitation counseling, applied behavior analysis, etc and help their customers to manage stress and reduce anxiety from feeling overwhelmed.',
        fee: '$70/hrs',
        images: [
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
        ],
        thumbnail: require('../assets/images/homeservice.png'),
    },
    {
        id: 2,
        title: 'Personal Aid Services',
        description: 'Our personal aid services provide comprehensive support to help you manage daily activities and achieve your personal goals. Our trained professionals offer assistance with various tasks, ensuring you maintain independence while receiving the help you need. We focus on creating a comfortable and supportive environment tailored to your specific requirements.',
        fee: '$50/hrs',
        images: [
            'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800',
        ],
        thumbnail: require('../assets/images/homeservice1.png'),
    },
    {
        id: 3,
        title: 'ADA Accommodations Consultation',
        description: 'We provide expert consultation on ADA (Americans with Disabilities Act) accommodations to ensure your workplace or facility is compliant and accessible. Our specialists work with you to identify necessary modifications, implement solutions, and create an inclusive environment. We help navigate the legal requirements while focusing on practical, effective accommodations.',
        fee: '$80/hrs',
        images: [
            'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800',
            'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
        ],
        thumbnail: require('../assets/images/homeservice2.png'),
    },
    {
        id: 4,
        title: 'Career Counseling',
        description: 'Our career counseling services help you navigate your professional journey with confidence. Whether you\'re exploring career options, planning a career change, or seeking advancement in your current field, our experienced counselors provide personalized guidance. We offer assessments, skill development strategies, and actionable plans to help you achieve your career goals.',
        fee: '$60/hrs',
        images: [
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
            'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800',
        ],
        thumbnail: require('../assets/images/homeservice3.png'),
    },
];

// Helper function to get service by ID
export const getServiceById = (id: number): ServiceData | undefined => {
    return SERVICES_DATA.find(service => service.id === id);
};

// Helper function to get all services
export const getAllServices = (): ServiceData[] => {
    return SERVICES_DATA;
};
