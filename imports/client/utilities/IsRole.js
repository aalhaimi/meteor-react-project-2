import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

const IsRole = ({ role, children }) => {
  if (Roles.userIsInRoles(Meteor.userId(), role)) {
    return children;
  }
  return null;
};

export default IsRole;
