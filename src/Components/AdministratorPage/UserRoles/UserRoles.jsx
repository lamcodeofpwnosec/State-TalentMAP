import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { get, isNil, omit, pull } from 'lodash';
import shortid from 'shortid';
import { getUsers } from 'actions/userRoles';
import DELEGATE_ROLES from 'Constants/DelegateRoles';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import SearchBar from 'Components/SearchBar/SearchBar';
import CheckBox from 'Components/CheckBox';
import TotalResults from 'Components/TotalResults';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import PaginationWrapper from 'Components/PaginationWrapper/PaginationWrapper';
import UserRow from './UserRow';

class UserRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      range: 100,
      sort: 'last_name',
      filters: [],
      q_username: '',
      q_name: '',
    };
  }

  // eslint-disable-next-line react/sort-comp
  callUpdateUsers = () => {
    const { page, range, sort, filters, q_username, q_name } = this.state;
    this.props.updateUsers(page, range, sort, filters.join(), q_username, q_name);
  };

  onPageChange = ({ page }) => {
    this.setState({ page }, this.callUpdateUsers);
  };

  filterByPermission = (clicked, permission) => {
    const stateFilters = this.state.filters;
    if (clicked) {
      stateFilters.push(permission);
    } else {
      pull(stateFilters, permission);
    }
    this.setState({ filters: stateFilters }, this.callUpdateUsers);
  };

  render() {
    const {
      totalUsers,
      usersList,
      usersIsLoading,
      usersHasErrored,
      modifyPermissionIsLoading,
      tableStats,
    } = this.props;
    const { page, range, sort } = this.state;
    const usersSuccess = !usersIsLoading && !usersHasErrored;

    const changeText = (e, id) => {
      this.setState({ [id]: e.target.value });
    };

    const submitText = (e) => {
      e.preventDefault();
      this.callUpdateUsers();
    };

    const clearText = (e, id) => {
      this.setState({ [id]: '' }, this.callUpdateUsers);
    };

    const onSortTable = (sortType) => {
      let sortType$;
      if (sortType === sort) {
        sortType$ = `-${sort}`;
      } else if (`-${sortType}` === sort) {
        sortType$ = '';
      } else {
        sortType$ = sortType;
      }
      this.setState({ sort: sortType$ }, this.callUpdateUsers);
    };

    // copying id from tableStats to group_id in DELEGATE_ROLES$
    const getDelegateRoles = () => {
      const roles = { ...DELEGATE_ROLES };
      tableStats.forEach((m) => {
        const roleGroup = get(roles, `${m.name}`);
        if (roleGroup) { roles[m.name].group_id = m.id; }
      });
      // remove role if did not match with tableStats(no id in roles)
      const removeRoles = [];
      Object.keys(roles).forEach((role) => {
        if (isNil(get(roles, `${role}.group_id`))) {
          removeRoles.push(role);
        }
      });
      return omit(roles, removeRoles);
    };

    const sortArrow = (sortType) => {
      let direction;

      switch (sort) {
        case sortType:
          direction = 'up';
          break;
        case `-${sortType}`:
          direction = 'down';
          break;
        default:
          direction = 'default';
      }

      if (direction === 'default') {
        return (
          <div className="delegate-role-header-sort-hidden">
            {
              <FA name="long-arrow-up" />
            }
          </div>
        );
      }

      return (
        <div className="delegate-role-header-sort">
          {
            <FA name={`long-arrow-${direction}`} />
          }
        </div>
      );
    };

    const DELEGATE_ROLES$ = getDelegateRoles();

    const getFilters = () => (
      Object.keys(DELEGATE_ROLES$).map(m => (
        <th key={get(DELEGATE_ROLES$, `${m}.group_name`)} >
          <CheckBox
            id={`${get(DELEGATE_ROLES$, `${m}.group_name`)}`}
            value={m.group_id}
            onCheckBoxClick={e => this.filterByPermission(e, get(DELEGATE_ROLES$, `${m}.group_id`))}
          />
        </th>
      ),
      ));

    // eslint-disable-next-line no-unused-vars
    const userRows = usersIsLoading ? [...new Array(10)].map(m => (
      <UserRow
        key={shortid.generate()}
        isLoading={usersIsLoading}
      />
    ),
    ) : usersList.map(m => (
      <UserRow
        key={m.id}
        userID={m.id}
        username={m.username}
        name={`${m.last_name}, ${m.first_name}`}
        permissionGroups={m.groups}
        delegateRoles={DELEGATE_ROLES$}
        isLoading={usersIsLoading}
      />
    ),
    );

    return (
      <div
        className="usa-grid-full profile-content-inner-container administrator-page"
      >
        <div className="usa-grid-full">
          <ProfileSectionTitle title="User Roles" icon="users" />
        </div>
        {
          usersSuccess &&
          <div className="usa-grid-full total-results">
            <TotalResults total={totalUsers} pageNumber={page} pageSize={range} />
          </div>
        }
        <div className="usa-grid-full">
          <table className={`delegateRole--table ${modifyPermissionIsLoading ? 'delegate-roles-loading' : ''}`}>
            <thead>
              <tr>
                <th key="username" className="delegate-role-header" onClick={() => onSortTable('username')}>userName {sortArrow('username')}</th>
                <th className="delegate-role-header" onClick={() => onSortTable('last_name')}>Last, First {sortArrow('last_name')}</th>
                {
                  Object.keys(DELEGATE_ROLES$).map(m => (
                    <th key={get(DELEGATE_ROLES$, `${m}.group_name`)} >
                      {get(DELEGATE_ROLES$, `${m}.title`)}
                    </th>
                  ))
                }
              </tr>
              <tr className="filter-row">
                <th>
                  <SearchBar
                    id="username-search-field"
                    labelSrOnly
                    noButton
                    onChangeText={e => changeText(e, 'q_username')}
                    onSubmitSearch={e => submitText(e, 'q_username')}
                    onClear={e => clearText(e, 'q_username')}
                    placeholder="Search by Username"
                    showClear
                    submitText="Search"
                    type="small"
                  />
                </th>
                <th>
                  <SearchBar
                    id="name-search-field"
                    labelSrOnly
                    noButton
                    onChangeText={e => changeText(e, 'q_name')}
                    onSubmitSearch={e => submitText(e, 'q_name')}
                    onClear={e => clearText(e, 'q_name')}
                    placeholder="Search by Last, First"
                    showClear
                    submitText="Search"
                    type="small"
                  />
                </th>
                {getFilters()}
              </tr>
            </thead>
            <tbody>
              {userRows}
            </tbody>
          </table>
        </div>
        <div className="usa-grid-full react-paginate">
          <PaginationWrapper
            totalResults={totalUsers}
            pageSize={range}
            onPageChange={this.onPageChange}
            forcePage={page}
          />
        </div>
      </div>
    );
  }
}

UserRoles.propTypes = {
  totalUsers: PropTypes.number,
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      last_name: PropTypes.string,
      first_name: PropTypes.string,
      groups: PropTypes.arrayOf(PropTypes.shape({})),
    })),
  usersIsLoading: PropTypes.bool,
  usersHasErrored: PropTypes.bool,
  modifyPermissionIsLoading: PropTypes.bool,
  tableStats: PropTypes.arrayOf(PropTypes.shape([])),
  updateUsers: PropTypes.func,
};

UserRoles.defaultProps = {
  totalUsers: 0,
  usersList: [{
    id: null,
    username: '',
    last_name: '',
    first_name: '',
    groups: [],
  }],
  usersIsLoading: false,
  usersHasErrored: false,
  modifyPermissionIsLoading: false,
  tableStats: [],
  updateUsers: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  usersList: get(state, 'usersSuccess.results', []),
  usersIsLoading: state.usersIsLoading,
  usersHasErrored: state.usersHasErrored,
  modifyPermissionIsLoading: state.modifyPermissionIsLoading,
  tableStats: state.getTableStatsSuccess,
});

export const mapDispatchToProps = dispatch => ({
  updateUsers: (page, range, sort, filters, q_username, q_name) =>
    dispatch(getUsers(page, range, sort, filters, q_username, q_name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRoles);
