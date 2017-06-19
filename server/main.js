import {Meteor} from 'meteor/meteor';
import '../imports/server/accounts';
import '../imports/api/items';

Meteor.publish('CurrentUser', function(){
  return Meteor.users.find({_id: this.userId()}, {
    fields: {
      roles: 1
    }
  })
})

Meteor.startup(() => {
  // code to run on server at startup
});
