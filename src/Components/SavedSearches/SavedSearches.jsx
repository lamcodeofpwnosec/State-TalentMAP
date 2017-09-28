import React from 'react';
import PropTypes from 'prop-types';
import * as PROP_TYPES from '../../Constants/PropTypes';
import Spinner from '../Spinner';
import SavedSearchesList from '../SavedSearchesList';
import Alert from '../Alert/Alert';
import ProfileSectionTitle from '../ProfileSectionTitle';

const SavedSearches = ({ savedSearches, savedSearchesIsLoading,
  savedSearchesHasErrored, goToSavedSearch, deleteSearch,
  deleteSavedSearchIsLoading, deleteSavedSearchHasErrored, deleteSavedSearchSuccess }) => (
    <div className={`usa-grid-full saved-searches-container ${savedSearchesIsLoading ? 'results-loading' : ''}`}>
      <ProfileSectionTitle title="Your Saved Searches:" />
      {
        !deleteSavedSearchIsLoading && !deleteSavedSearchSuccess && deleteSavedSearchHasErrored &&
          <Alert
            type="error"
            title="Error"
            messages={[{ body: deleteSavedSearchHasErrored }]}
          />
      }
      {
        !deleteSavedSearchIsLoading && deleteSavedSearchSuccess && !deleteSavedSearchHasErrored &&
          <Alert
            type="success"
            title="Success"
            messages={[{ body: deleteSavedSearchSuccess }]}
          />
      }
      {
        savedSearchesIsLoading && !savedSearchesHasErrored &&
          <Spinner type="homepage-position-results" size="big" />
      }
      <SavedSearchesList
        savedSearches={savedSearches}
        goToSavedSearch={goToSavedSearch}
        deleteSearch={deleteSearch}
      />
    </div>
);

SavedSearches.propTypes = {
  savedSearches: PROP_TYPES.SAVED_SEARCH_PARENT_OBJECT.isRequired,
  savedSearchesIsLoading: PropTypes.bool.isRequired,
  savedSearchesHasErrored: PropTypes.bool.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  deleteSavedSearchIsLoading: PropTypes.bool.isRequired,
  deleteSavedSearchHasErrored: PROP_TYPES.DELETE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  deleteSavedSearchSuccess: PROP_TYPES.DELETE_SAVED_SEARCH_SUCCESS.isRequired,
};

export default SavedSearches;