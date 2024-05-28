import type { HelloParams, HelloResponse } from '../validations/hello.schema';

export class HelloService {
	async getHello(param: HelloParams): Promise<HelloResponse> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					message: `Hello ${param.name}!`
				});
			}, 1000);
		});
	}
}
