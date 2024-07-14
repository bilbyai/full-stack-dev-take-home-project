import { trpcServer } from '$lib/trpc';
import { DateRange } from '$lib/types/date-range';
import { dateRangeFromMap } from '$lib/utils/date';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch, url}) => {
	const dateRangeType:DateRange = url.searchParams.get('date-range') as DateRange ?? DateRange.LastWeek;
	const dateRangeFrom = dateRangeFromMap[dateRangeType];

	dateRangeFrom.setHours(0, 0, 0, 0);

	const uniqueVisitorsResponse = await trpcServer(fetch).heatmap.getUniqueVisitors.query({
		from: dateRangeFrom,
		until: new Date()
	});
	
	return {
		uniqueVisitors: uniqueVisitorsResponse,
		dateRange: dateRangeType
	};
}) satisfies PageServerLoad;