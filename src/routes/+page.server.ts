import { trpcServer } from '$lib/trpc';
import { helloParamsSchema } from '$server/validations/hello.schema';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	async default({ request, fetch }) {
		const formData = Object.fromEntries(await request.formData());

		const safeParseFormData = helloParamsSchema.safeParse(formData);

		if (safeParseFormData.success) {
			try {
				const sayHelloResponse = await trpcServer(fetch).hello.sayHello.mutate(
					safeParseFormData.data
				);

				return {
					message: sayHelloResponse.message
				};
			} catch (e) {
				if (e instanceof Error) {
					return {
						error: e.message
					};
				}

				return {
					error: 'An error occurred please try again'
				};
			}
		} else {
			const { fieldErrors: errors } = safeParseFormData.error.flatten();

			return {
				data: formData,
				errors
			};
		}
	}
};
