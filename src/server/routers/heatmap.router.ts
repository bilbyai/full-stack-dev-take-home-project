import { UniqueVisitorsService } from '$server/services/uniqueVisitors.service';
import { uniqueVisitorsParamsSchema } from '$server/validations/uniqueVisitors.schema';
import { createTRPCRouter, publicProcedure } from '../trpcContext';

export const heatmapRouter = createTRPCRouter({
	getUniqueVisitors: publicProcedure.input(uniqueVisitorsParamsSchema).query(({ input }) => {
		return new UniqueVisitorsService().getUniqueVisitors(input);
	})
});
