import { heatmapRouter } from './routers/heatmap.router';
import { createTRPCRouter } from './trpcContext';

export const appRouter = createTRPCRouter({
	heatmap: heatmapRouter
});

export type AppRouter = typeof appRouter;
