import { batch } from 'react-redux';
import { get } from 'lodash';
import { downloadFromResponse } from 'utilities';
import { toastError } from './toast';
import api from '../api';

export function downloadPositionData(excludeAP = false, excludePV = false) {
  const url = `/available_position/favorites/export/?exclude_available=${excludeAP}&exclude_projected=${excludePV}`;
  return api().get(url, {
    responseType: 'stream',
  })
    .then((response) => {
      downloadFromResponse(response, 'TalentMap_favorites_export');
    })
    .catch(() => {
    // eslint-disable-next-line global-require
      require('../store').store.dispatch(toastError('Export unsuccessful. Please try again.', 'Error exporting'));
    });
}

export function favoritePositionsHasErrored(bool) {
  return {
    type: 'FAVORITE_POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function favoritePositionsIsLoading(bool) {
  return {
    type: 'FAVORITE_POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function favoritePositionsFetchDataSuccess(results) {
  return {
    type: 'FAVORITE_POSITIONS_FETCH_DATA_SUCCESS',
    results,
  };
}

export function favoritePositionsFetchData(sortType, limit = 15, page = 1, openPV) {
  // eslint-disable-next-line no-console
  console.log(openPV);
  // open or pv
  return (dispatch) => {
    batch(() => {
      dispatch(favoritePositionsIsLoading(true));
      dispatch(favoritePositionsHasErrored(false));
    });
    const data$ = {
      favorites: [],
      favoritesPV: [],
      counts: {
        favorites: 0,
        favoritesPV: 0,
        all: 0,
      } };
    let url = `/available_position/favorites/?limit=${limit}&page=${page}`;
    let urlPV = `/projected_vacancy/favorites/?limit=${limit}&page=${page}`;

    if (sortType) {
      const append = `?ordering=${sortType}`;
      url += append;
      urlPV += append;
    }

    const fetchFavorites = () =>
      api().get(url)
        .then(({ data }) => data)
        .catch(error => error);

    const fetchPVFavorites = () =>
      api().get(urlPV)
        .then(({ data }) => data)
        .catch(error => error);

    const queryProms = [fetchFavorites(), fetchPVFavorites()];

    Promise.all(queryProms)
      .then((results) => {
      // if any promise returned with errors, return the error
        let err;
        results.forEach((result) => {
          if (result instanceof Error) {
            err = result;
          }
        });
        if (err) {
          batch(() => {
            dispatch(favoritePositionsHasErrored(true));
            dispatch(favoritePositionsIsLoading(false));
          });
        } else {
        // object 0 is favorites
          data$.counts.favorites = get(results, '[0].count', 0);
          data$.counts.favoritesPV = get(results, '[1].count', 0);
          data$.counts.all = get(results, '[0].count', 0) + get(results, '[1].count', 0);
          data$.favorites = get(results, '[0].results', []);
          data$.results = get(results, '[0].results', []);
          // object 1 is PV favorites
          // add PV property
          data$.favoritesPV = get(results, '[1].results', []).map(m => ({ ...m, isPV: true }));
          batch(() => {
            dispatch(favoritePositionsFetchDataSuccess(data$));
            dispatch(favoritePositionsHasErrored(false));
            dispatch(favoritePositionsIsLoading(false));
          });
        }
      })
      .catch(() => {
        batch(() => {
          dispatch(favoritePositionsHasErrored(true));
          dispatch(favoritePositionsIsLoading(false));
        });
      });
  };
}
