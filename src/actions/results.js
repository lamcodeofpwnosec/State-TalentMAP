import { CancelToken } from 'axios';
import queryString from 'query-string';
import { get } from 'lodash';
import api from '../api';
import { checkFlag } from '../flags';

const getUseAP = () => checkFlag('flags.available_positions');

let cancel;

export function resultsHasErrored(bool) {
  return {
    type: 'RESULTS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function resultsIsLoading(bool) {
  return {
    type: 'RESULTS_IS_LOADING',
    isLoading: bool,
  };
}
export function resultsFetchDataSuccess(results) {
  return {
    type: 'RESULTS_FETCH_DATA_SUCCESS',
    results,
  };
}

export function resultsSimilarPositionsHasErrored(bool) {
  return {
    type: 'RESULTS_SIMILAR_POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function resultsSimilarPositionsIsLoading(bool) {
  return {
    type: 'RESULTS_SIMILAR_POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}
export function resultsSimilarPositionsFetchDataSuccess(results) {
  return {
    type: 'RESULTS_SIMILAR_POSITIONS_FETCH_DATA_SUCCESS',
    results,
  };
}

export function resultsFetchSimilarPositions(id) {
  return (dispatch) => {
    if (cancel) { cancel(); }
    const useAP = getUseAP();
    const prefix = useAP ? '/fsbid/available_positions' : '/cycleposition';

    dispatch(resultsSimilarPositionsIsLoading(true));
    api().get(`${prefix}/${id}/similar/?limit=3`)
      .then(response => response.data)
      .then((results) => {
        dispatch(resultsSimilarPositionsFetchDataSuccess(results));
        dispatch(resultsSimilarPositionsIsLoading(false));
        dispatch(resultsSimilarPositionsHasErrored(false));
      })
      .catch(() => {
        dispatch(resultsSimilarPositionsIsLoading(false));
        dispatch(resultsSimilarPositionsHasErrored(true));
      });
  };
}

export function downloadAvailablePositionData(query) {
  const prefix = 'fsbid/available_positions/export';
  return api()
  .get(`${prefix}/?${query}`, {
    cancelToken: new CancelToken((c) => { cancel = c; }),
    responseType: 'stream',
  })
  .then((response) => {
    const cd = get(response, 'headers.content-disposition');
    const filename = cd.replace('attachment; filename=', '') || 'TalentMap_search_export';
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
  });
}

export function fetchResultData(query) {
  const useAP = getUseAP();

  let prefix = useAP ? '/fsbid/available_positions' : '/cycleposition';
  const parsed = queryString.parse(query);
  const isPV = parsed.projectedVacancy;

  if (isPV) {
    prefix = '/fsbid/projected_vacancies';
    delete parsed.projectedVacancy;
  }

  const query$ = queryString.stringify(parsed);

  return api()
  .get(`${prefix}/?${query$}`, {
    cancelToken: new CancelToken((c) => { cancel = c; }),
  })
  .then((response) => {
    if (isPV) {
      return {
        ...response.data,
        isProjectedVacancy: true,
      };
    }
    return response.data;
  });
}

export function resultsFetchData(query) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); dispatch(resultsIsLoading(true)); }
    dispatch(resultsIsLoading(true));
    dispatch(resultsHasErrored(false));
    fetchResultData(query)
      .then((results) => {
        dispatch(resultsFetchDataSuccess(results));
        dispatch(resultsHasErrored(false));
        dispatch(resultsIsLoading(false));
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          dispatch(resultsHasErrored(false));
          dispatch(resultsIsLoading(true));
        } else {
          dispatch(resultsFetchDataSuccess({ results: [] }));
          dispatch(resultsHasErrored(true));
          dispatch(resultsIsLoading(false));
        }
      });
  };
}
