export type OrderItem = {
    id: number;
    date: string;
    type: string;
    receipt: string;
};

export type Card = {
    id: string;
    cardType: string;
    lastFourDigits: string;
    expiryDate: string;
    isDefault: boolean;
};

export type UserProfile = {
    name: string;
    email: string;
    phone: string;
    bio: string;
    avatar: string;
};

export const userProfile: UserProfile = {
    name: 'Angelina',
    email: 'Info@angelina.com',
    phone: '479-785-6200',
    bio: 'Lorem ipsum dolor sit amet, from us in consectetur a adipiscing elit, sed do us eisusmod tempor for incididunt ut more enim ad minim veniam.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
};

export const orders: OrderItem[] = [
    { id: 1, date: '19 June 2024', type: 'Pro Monthly', receipt: 'PDF' },
    { id: 2, date: '19 June 2024', type: 'Pro Monthly', receipt: 'PDF' },
    { id: 3, date: '19 June 2024', type: 'Pro Monthly', receipt: 'PDF' },
];

export const paymentCards: Card[] = [
    { 
        id: '1', 
        cardType: 'MasterCard', 
        lastFourDigits: '1424', 
        expiryDate: '06/2026', 
        isDefault: false 
    },
    { 
        id: '2', 
        cardType: 'Visa', 
        lastFourDigits: '0100', 
        expiryDate: '07/2027', 
        isDefault: true 
    },
];
