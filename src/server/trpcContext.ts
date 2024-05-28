import { TRPCError, initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import superJSON from 'superjson';
import { ZodError } from 'zod';

export const createSvelteKitTRPCContext =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(locals: App.Locals) => (opts: FetchCreateContextFnOptions) => locals;

const t = initTRPC.context<ReturnType<typeof createSvelteKitTRPCContext>>().create({
	transformer: superJSON,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
			}
		};
	}
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const enforceUserIsAuth = t.middleware(({ next, ctx }) => {
	const session = true; // You can replace this with a call to your session store or auth provider

	if (!session) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'You must be logged in to perform this action.'
		});
	}

	return next({
		ctx
	});
});

export const privateProcedure = t.procedure.use(enforceUserIsAuth);
