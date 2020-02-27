import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userHasPermissions } from 'utilities';
import CheckBox from 'Components/CheckBox';
import { get } from 'lodash';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { modifyPermission } from 'actions/userRoles';

class UserRow extends Component {
  checkPermission(permission) {
    const isEmpty = !this.props.permissionGroups.length;
    if (isEmpty) return false;

    const userPerms = this.props.permissionGroups.map(permObj => permObj.name);

    return userHasPermissions(permission, userPerms || []);
  }

  updatePermission(addRole, groupID) {
    this.props.modifyPermission(addRole, this.props.userID, groupID);
  }

  render() {
    const {
      username, name, userID, delegateRoles,
    } = this.props;

    const tdArray = [];
    Object.keys(this.props.delegateRoles).forEach(role => (
      tdArray.push(
        <td key={get(delegateRoles, `${role}.group_name`)} className="delegateRoleCell">
          <CheckBox
            label={`Toggle ${get(delegateRoles, `${role}.group_name`)} permission.`}
            id={`${userID}-${get(delegateRoles, `${role}.group_name`)}`}
            value={this.checkPermission([get(delegateRoles, `${role}.group_name`)])}
            onCheckBoxClick={e => this.updatePermission(e, get(delegateRoles, `${role}.group_name`))}
            labelSrOnly
          />
        </td>,
      )
    ));

    return (
      <tr>
        <td>{username}</td>
        <td>{name}</td>
        {tdArray}
      </tr>
    );
  }
}

UserRow.propTypes = {
  userID: PropTypes.number.isRequired,
  username: PropTypes.string,
  name: PropTypes.string,
  permissionGroups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  delegateRoles: PropTypes.shape({}),
  modifyPermission: PropTypes.func.isRequired,
};

UserRow.defaultProps = {
  username: '',
  name: '',
  delegateRoles: {},
  onClick: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  modifyPermissionIsLoading: state.modifyPermissionIsLoading,
  modifyPermissionHasErrored: state.modifyPermissionHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  modifyPermission: (addRole, groupID, userID) => dispatch(modifyPermission(addRole,
      groupID, userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRow);
