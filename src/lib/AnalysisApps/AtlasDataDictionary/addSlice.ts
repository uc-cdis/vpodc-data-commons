import { gen3Api } from '@gen3/core';
import { dataDictionaryEndpoint } from '../SharedUtils/Endpoints';

// TODO - do we need this file if we already have /src/lib/AnalysisApps/PLP/Utils/plpSlice.ts ?
export interface SelectSourceAPIResponse {
    sources: SelectSourceResponse[];
}

export interface SelectSourceResponse {
    source_id: number;
    source_name: string;
    description: string;
    CurrentTeamProjectAccessible?: boolean
};

export interface Cohort {
  cohort_definition_id: number;
  cohort_name: string;
  size: number;
}
export interface SelectCohortResponse {
    cohort_definitions_and_stats: Cohort[];
};
export interface SelectCohortRequestParams {
    sourceId: number;
    selectedTeamProject: string;
};

/**
 * Defines ??. Derived from gen3Api core API.
 *
 * @param endpoints - Defines endpoints ??
 *  @param request - Queries ??
 * @returns: Object ??
 */

export const plpApi = gen3Api.injectEndpoints({
  endpoints: (builder) => ({
    retrieveDD: builder.query<SelectSourceResponse[], void>({
      query: () => `${dataDictionaryEndpoint}/Retrieve`,
      /*transformResponse: (response: SelectSourceAPIResponse) => {
        return response?.sources;
      },*/
    }),
  }),
});

export const {
  useRetrieveDDQuery,
} = plpApi;
