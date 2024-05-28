import { HelloService } from '../services/hello.service';
import { createTRPCRouter, publicProcedure } from '../trpcContext';
import { helloParamsSchema } from '../validations/hello.schema';

export const helloRouter = createTRPCRouter({
	sayHello: publicProcedure.input(helloParamsSchema).mutation(({ input }) => {
		return new HelloService().getHello(input);
	})
});
