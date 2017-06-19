import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
const Items = new Mongo.Collection('items');

export default Items;

const ItemSchema = new SimpleSchema({
  text: String,
  value: SimpleSchema.Integer,
});

const ItemsSchema = new SimpleSchema({
  itemOne: ItemSchema,
  itemTwo: ItemSchema,
  lastUpdated: {
    type: Date,
    optional: true,
  },
});

Items.attachSchema(ItemsSchema);

if (Meteor.isServer) {
  Meteor
        .publish('allItems', () => Items.find({}, {

          limit: 50,
          sort: {
            lastUpdated: 1,
          },

        }));

  Meteor.methods({
    insertNewItem(itemOne, itemTwo) {
      Items.insert({
        itemOne: {
          text: itemOne,
          value: 0,
        },
        itemTwo: {
          text: itemTwo,
          value: 0,
        },
      });
    },
    voteItem(item, position) {
      const date = new Date();
      if (position === 'itemOne') {
        Items.update({
          _id: item._id,
        }, {
          $inc: {
            'itemOne.value': 1,
          },
          $set: {
            lastUpdated: date,
          },
        });
      } else {
        Items.update({
          _id: item._id,
        }, {
          $inc: {
            'itemTwo.value': 1,
          },
          $set: {
            lastUpdated: date,
          },
        });
      }
    },
  });
}
