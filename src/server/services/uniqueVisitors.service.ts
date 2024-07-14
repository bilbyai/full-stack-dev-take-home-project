import { ELASTIC_SEARCH_INDEX } from '$env/static/private';
import { elasticClient as elastic } from '$lib/elastic';
import type { UniqueVisitorsParams, UniqueVisitorsResponse } from '../validations/uniqueVisitors.schema';

export class UniqueVisitorsService {
	async getUniqueVisitors(param: UniqueVisitorsParams): Promise<UniqueVisitorsResponse[]> {
		const result = await elastic.search({
			index: ELASTIC_SEARCH_INDEX,
			body: {
				aggs: {
					countries: {
						terms: {
							field: "geo.dest",
							size: 25
						},
						aggs: {
							hours: {
								histogram: {
									field: "hour_of_day",
									interval: 1
								},
								aggs: {
									unique: {
										cardinality: {
											field: "clientip"
										}
									}
								}
							}
						}
					}
				},
				size: 0,
				query: {
					bool: {
						must: [
							{
								range: {
									"@timestamp": {
										gte: param.from.toISOString(),
										lte: param.until.toISOString(),
										format: "strict_date_optional_time"
									}
								}
							}
						]
					}
				},
				runtime_mappings: {
					"hour_of_day": {
						type: "long",
						script: {
							source: "emit(doc['timestamp'].value.getHour());"
						}
					}
				}
			}
		});

		return result.aggregations?.countries?.buckets.map((bucket) => {
			return {
				country: bucket.key,
				hours: bucket.hours.buckets.map((bucket) => {
					return {
						hour: bucket.key,
						unique: bucket.unique.value
					};
				})
			};
		}) as UniqueVisitorsResponse[];
	}
}
