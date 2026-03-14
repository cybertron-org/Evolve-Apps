export type SessionData = {
    id: number;
    title: string;
    coachName: string;
    coachExperience: string;
    coachImage: string;
    startTime: string;
    duration: string;
    isLive: boolean;
    zoomLink?: string;
};

export const sessionsData: Record<number, SessionData> = {
    // Old consultations
    1: {
        id: 1,
        title: 'Executive Coaching Session',
        coachName: 'Gilbert',
        coachExperience: '8 year of experience',
        coachImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
        startTime: '8:00 PM',
        duration: '45 Minutes',
        isLive: true,
        zoomLink: 'https://us05web.zoom.us/j/89193554699?pwd=hCASQR2xeYDy0xobaKVQDsJWeQD8Pk.1'
    },
    2: {
        id: 2,
        title: 'Executive Coaching Session',
        coachName: 'Sarah',
        coachExperience: '5 year of experience',
        coachImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        startTime: '10:00 AM',
        duration: '60 Minutes',
        isLive: false
    },
    3: {
        id: 3,
        title: 'ADA Accommodations Consultation',
        coachName: 'Michael',
        coachExperience: '10 year of experience',
        coachImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        startTime: '2:00 PM',
        duration: '30 Minutes',
        isLive: true,
        zoomLink: 'https://us05web.zoom.us/j/89193554699?pwd=hCASQR2xeYDy0xobaKVQDsJWeQD8Pk.1'
    },
    // New consultations (IDs 101-104)
    101: {
        id: 101,
        title: 'Personal Aid Services',
        coachName: 'Emma',
        coachExperience: '6 year of experience',
        coachImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        startTime: '9:00 AM',
        duration: '30 Minutes',
        isLive: false
    },
    102: {
        id: 102,
        title: 'Executive Coaching Session',
        coachName: 'James',
        coachExperience: '12 year of experience',
        coachImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        startTime: '9:00 AM',
        duration: '45 Minutes',
        isLive: true,
        zoomLink: 'https://us05web.zoom.us/j/89193554699?pwd=hCASQR2xeYDy0xobaKVQDsJWeQD8Pk.1'
    },
    103: {
        id: 103,
        title: 'ADA Accommodations Consultation',
        coachName: 'Lisa',
        coachExperience: '9 year of experience',
        coachImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        startTime: '9:00 AM',
        duration: '30 Minutes',
        isLive: false
    },
    104: {
        id: 104,
        title: 'Wellness Coaching',
        coachName: 'David',
        coachExperience: '7 year of experience',
        coachImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        startTime: '10:00 AM',
        duration: '60 Minutes',
        isLive: false
    }
};
