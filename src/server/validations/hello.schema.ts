import { z } from 'zod';

export const helloParamsSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(2, { message: 'Name must be at least 2 characters long' })
		.max(64, { message: 'Name must be less than 64 characters long' })
		.trim()
});

export const helloResponseSchema = z.object({
	message: z.string()
});

export type HelloParams = z.infer<typeof helloParamsSchema>;
export type HelloResponse = z.infer<typeof helloResponseSchema>;
