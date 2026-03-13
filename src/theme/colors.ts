export const colors = {
  primary: '#333337',
  secondary: '#EC4899',
  accent: '#F97316',
  background: {
    light: '#FFFFFF',
    dark: '#111827',
  },
  text: {
    light: '#28282A',
    dark: '#F9FAFB',
    muted: '#9CA3AF',
  },
  border: '#E5E7EB',
  input: {
    background: '#F3F4F6',
    placeholder: '#9CA3AF',
  },
  social: {
    facebook: '#1877F2',
    google: '#DB4437',
  },
  gradient: {
    start: '#8B5CF6',
    end: '#EC4899',
  },
  decoration: {
    rightShape: '#B7456E',
    leftShape: '#EC8B4D',
  }
};


// src/theme/colors.ts
export const lightColors = {
  primary: '#0C213F',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  card: '#FFFFFF',
  text: '#0C213F',
  subText: '#6B7280',
  border: '#E5E7EB',
  icon: '#374151',
  error: '#EF4444',
  success: '#10B981',
  inputBg: '#F9FAFB',
};

export const darkColors = {
  primary: '#60A5FA',
  background: '#0F172A',
  surface: '#1E293B',
  card: '#1E293B',
  text: '#F1F5F9',
  subText: '#94A3B8',
  border: '#334155',
  icon: '#CBD5E1',
  error: '#F87171',
  success: '#34D399',
  inputBg: '#1E293B',
};

export type ThemeColors = typeof lightColors;