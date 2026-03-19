import { useState, useMemo, useEffect } from 'react';
import { useCourseDetail } from './queries/useCourseDetail';
import { useCourseAvailability } from './queries/useCourseAvailability';
import { useCourseSlots } from './queries/useCourseSlots';

export const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface DurationOption {
    label: string;
    hours: number;
}

export function useBookingCalendarLogic(serviceId: number) {
    const todayInit = new Date();
    const todayDay = todayInit.getDate();
    const todayMonth = todayInit.getMonth();
    const todayYear = todayInit.getFullYear();

    // Data hooks
    const { data: course } = useCourseDetail(serviceId);
    const { data: availabilityData } = useCourseAvailability(serviceId);

    // States
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [selectedDuration, setSelectedDuration] = useState<DurationOption | null>(null);
    const [currentMonth, setCurrentMonth] = useState(todayMonth);
    const [currentYear, setCurrentYear] = useState(todayYear);

    // Date formatting string for API
    const formattedDate = useMemo(() => {
        if (!selectedDate) return null;
        const m = String(currentMonth + 1).padStart(2, '0');
        const d = String(selectedDate).padStart(2, '0');
        return `${currentYear}-${m}-${d}`;
    }, [selectedDate, currentMonth, currentYear]);

    const { data: slotsData, isLoading: isLoadingSlots } = useCourseSlots(serviceId, formattedDate);

    const timeOptions = useMemo(() => {
        const timesRaw: string[] = slotsData?.data?.[0]?.time || [];
        return timesRaw.map(t => {
            const [hStr, mStr] = t.split(':');
            const h = parseInt(hStr, 10);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const h12 = h % 12 || 12;
            return `${h12}:${mStr} ${ampm}`;
        });
    }, [slotsData]);

    const durationOptions = useMemo(() => {
        const durationsRaw: string[] = slotsData?.data?.[0]?.duration || [];
        return durationsRaw.map(dStr => {
            let hours = 0;
            if (dStr.includes('hour')) {
                const hMatch = dStr.match(/(\d+)\s*hour/);
                if (hMatch) hours += parseInt(hMatch[1], 10);
            }
            if (dStr.includes('min')) {
                const mMatch = dStr.match(/(\d+)\s*min/);
                if (mMatch) hours += parseInt(mMatch[1], 10) / 60;
            }
            return { label: dStr, hours };
        });
    }, [slotsData]);

    // Handle resetting or pre-selecting options when date changes
    useEffect(() => {
        if (timeOptions.length > 0 && !timeOptions.includes(selectedTime)) {
            setSelectedTime(timeOptions[0]);
        } else if (timeOptions.length === 0 && selectedDate !== null) {
            setSelectedTime('');
        }
    }, [timeOptions, selectedTime, selectedDate]);

    useEffect(() => {
        if (durationOptions.length > 0) {
            const exists = durationOptions.find(d => d.label === selectedDuration?.label);
            if (!exists) setSelectedDuration(durationOptions[0]);
        } else if (durationOptions.length === 0 && selectedDate !== null) {
            setSelectedDuration(null);
        }
    }, [durationOptions, selectedDuration, selectedDate]);

    // Month Navigation
    const handlePrevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
    };
    const handleNextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
    };

    // Calendar Calculations
    const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (m: number, y: number) => {
        const d = new Date(y, m, 1).getDay();
        return d === 0 ? 6 : d - 1;
    };

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);

    const calendarDays = useMemo(() => {
        const days: { day: number; isCurrentMonth: boolean }[] = [];
        for (let i = firstDay - 1; i >= 0; i--) days.push({ day: prevMonthDays - i, isCurrentMonth: false });
        for (let i = 1; i <= daysInMonth; i++)  days.push({ day: i, isCurrentMonth: true });
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++)    days.push({ day: i, isCurrentMonth: false });
        return days;
    }, [daysInMonth, firstDay, prevMonthDays]);

    // Availability Calculations
    const availability = useMemo(() => {
        const weeklyDays: string[] = availabilityData?.data?.weekly_days || availabilityData?.weekly_days || [];
        const specialDates: string[] = availabilityData?.data?.custom_dates || availabilityData?.custom_dates || [];

        const wDayNums: number[] = [];
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(currentYear, currentMonth, d);
            const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
            if (weeklyDays.includes(dayName)) wDayNums.push(d);
        }

        const ranges: { start: number; end: number }[] = [];
        if (wDayNums.length > 0) {
            let start = wDayNums[0], prev = wDayNums[0];
            for (let i = 1; i < wDayNums.length; i++) {
                if (wDayNums[i] === prev + 1) prev = wDayNums[i];
                else {
                    if (prev > start) ranges.push({ start, end: prev });
                    start = prev = wDayNums[i];
                }
            }
            if (prev > start) ranges.push({ start, end: prev });
        }

        const sDayNums: number[] = [];
        for (const dateStr of specialDates) {
            const [y, m, d] = dateStr.split('-').map(Number);
            if (y === currentYear && m - 1 === currentMonth) sDayNums.push(d);
        }

        return { weeklyDayNumbers: wDayNums, specialDayNumbers: sDayNums, weeklyRanges: ranges };
    }, [availabilityData, currentMonth, currentYear, daysInMonth]);

    const allAvailableDates = useMemo(() => new Set([...availability.weeklyDayNumbers, ...availability.specialDayNumbers]), [availability]);

    const helpers = {
        isDateAvailable: (day: number) => allAvailableDates.has(day),
        isToday: (day: number) => day === todayDay && currentMonth === todayMonth && currentYear === todayYear,
        getDateRangeStatus: (day: number) => {
            for (const r of availability.weeklyRanges) {
                if (day === r.start) return 'range-start';
                if (day === r.end) return 'range-end';
                if (day > r.start && day < r.end) return 'range-middle';
            }
            return null;
        },
        formatBookingDate: () => selectedDate ? `${selectedDate} ${MONTHS[currentMonth]} ${currentYear}` : 'Select a date'
    };

    return {
        course,
        availabilityData,
        selectedDate, setSelectedDate,
        currentImageIndex, setCurrentImageIndex,
        selectedTime, setSelectedTime,
        selectedDuration, setSelectedDuration,
        currentMonth, currentYear,
        handlePrevMonth, handleNextMonth,
        calendarDays,
        helpers,
        specialDayNumbers: availability.specialDayNumbers,
        weeklyDayNumbers: availability.weeklyDayNumbers,
        isBookingComplete: selectedDate !== null && !!selectedTime && selectedDuration !== null,
        timeOptions,
        durationOptions,
        isLoadingSlots
    };
}
