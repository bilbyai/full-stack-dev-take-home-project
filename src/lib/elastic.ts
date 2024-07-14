import { Client } from '@elastic/elasticsearch';
import type { Client as NewTypes } from '@elastic/elasticsearch';
import { ELASTIC_SEARCH_API_KEY, ELASTIC_SEARCH_CLOUD_ID } from '$env/static/private';

export const elasticClient: NewTypes = new Client({
    cloud: {
        id: ELASTIC_SEARCH_CLOUD_ID
    },
    auth: { apiKey: ELASTIC_SEARCH_API_KEY }
})