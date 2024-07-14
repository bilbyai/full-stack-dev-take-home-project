import { DateRange } from "$lib/types/date-range";

export function addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}

export const dateRangeFromMap = {
	[DateRange.LastWeek]: addDays(new Date(), -7),
	[DateRange.Last2Weeks]: addDays(new Date(), -14),
	[DateRange.LastMonth]: addDays(new Date(), -30),
	[DateRange.LastQuarter]: addDays(new Date(), -90),
	[DateRange.LastYear]: addDays(new Date(), -365),
}
