import React from 'react';
import {Meteor} from 'meteor/meteor';

const IsRole = function ({role, children}) {
    if (Roles.userIsInRoles(Meteor.userId(), role)) {
        return children;
    }
    return null;
}

export default IsRole;