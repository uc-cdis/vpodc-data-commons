import { gen3Api } from '@gen3/core';
import { SourcesEndpoint, CohortsEndpoint } from '../../SharedUtils/Endpoints';

export interface SelectSourceAPIResponse {
    sources: SelectSourceResponse[];
}

export interface SelectSourceResponse {
    source_id: number;
    source_name: string;
    description: string;
    CurrentTeamProjectAccessible: "true" | "false";
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
    selectSource: builder.query<SelectSourceResponse[], string>({
      query: (team) => `${SourcesEndpoint}?team-project=${team}`,
      transformResponse: (response: SelectSourceAPIResponse) => {
        return response?.sources;
      },
    }),
    selectCohort: builder.query<SelectCohortResponse, SelectCohortRequestParams>({
      query: ({sourceId, selectedTeamProject}: SelectCohortRequestParams) => `${CohortsEndpoint}/${sourceId}/by-team-project?team-project=${selectedTeamProject}`,
    }),
  }),
});

export const {
  useSelectSourceQuery,
  useSelectCohortQuery,
} = plpApi;
