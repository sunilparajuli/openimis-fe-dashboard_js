import { formatGraphQLError, formatServerError } from "@openimis/fe-core";

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  dashboardMetrics: null, 
  generalAnalytics: null,
  geospatialAnalytics: null,
  epidemiologicalAnalytics: null,
  customerJourneyAnalytics: null,
  operationalAnalytics: null,
  socialProtectionAnalytics: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_ALL_ANALYTICS_REQ':
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null,
      };

    case 'FETCH_ALL_ANALYTICS_RESP':
      const data = action.payload.data;
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: formatGraphQLError(action.payload),
        dashboardMetrics: data.dashboard, 
        generalAnalytics: data.analytics, 
        
        geospatialAnalytics: data.geospatialAnalytics,
        epidemiologicalAnalytics: data.epidemiologicalAnalytics,
        customerJourneyAnalytics: data.customerJourneyAnalytics,
        operationalAnalytics: data.operationalAnalytics,
        socialProtectionAnalytics: data.socialProtectionAnalytics,
      };

    case 'FETCH_ALL_ANALYTICS_ERR':
      return {
        ...state,
        fetching: false,
        error: formatServerError(action.payload),
      };

    default:
      return state;
  }
}

export default reducer;