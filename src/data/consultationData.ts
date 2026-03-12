export type ConsultationItem = {
    id: number;
    title: string;
    price: number;
    status: 'free' | 'paid';
    startTime: string;
};

export type NewConsultation = {
    id: number;
    title: string;
    time: string;
    status: 'upcoming' | 'live' | 'scheduled';
    statusText: string;
    category: 'new' | 'today';
};

export const oldConsultations: ConsultationItem[] = [
    { id: 1, title: 'Executive Coaching Session', price: 0, status: 'free', startTime: '30 minutes' },
    { id: 2, title: 'Executive Coaching Session', price: 30, status: 'paid', startTime: '30 minutes' },
    { id: 3, title: 'ADA Accommodations Consultation', price: 60, status: 'paid', startTime: '30 minutes' },
];

export const newConsultations: NewConsultation[] = [
    { id: 101, title: 'PERSONAL AID SERVICES', time: '9:00 AM', status: 'upcoming', statusText: 'Start in 30 minutes', category: 'new' },
    { id: 102, title: 'EXECUTIVE COACHING SESSION', time: '9:00 AM', status: 'live', statusText: 'Live Now', category: 'today' },
    { id: 103, title: 'ADA ACCOMMODATIONS CONSULT...', time: '9:00 AM', status: 'scheduled', statusText: 'Start in 30 minutes', category: 'today' },
    { id: 104, title: 'WELLNESS COACHING', time: '10:00 AM', status: 'upcoming', statusText: 'Start in 1 hour', category: 'new' },
];
