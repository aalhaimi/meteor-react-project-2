import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import Items from '../api/items';
import {autobind} from 'core-decorators';
import {withData} from 'meteor/orionsoft:react-meteor-data';
import IsRole from './utilities/IsRole'; 

import Item from './Item';

// App component - represents the whole app
@withData(function(){
    let itemSub = Meteor.subscribe('allItems');
    let showAll = Session.get('showAll');
    return {
        showAll,
        itemsReady: itemSub.ready(),
        items: Items.find({}, {
            limit: showAll
                ? 50
                : 1,
            sort: {
                lastUpdated: 1
            }
        }).fetch()

}})
@autobind
export default class App extends Component {

    static propTypes = {
        itemsReady: PropTypes.bool,
        items: PropTypes.array,
        showall: PropTypes.bool,
    }

    addItems(event) {
        event.preventDefault();
        // console.log(this.refs.itemOne.value.trim());
        const itemOne = this
            .refs
            .itemOne
            .value
            .trim();
        const itemTwo = this
            .refs
            .itemTwo
            .value
            .trim();

        if (itemOne !== '' && itemTwo !== '') {
            Meteor.call('insertNewItem', itemOne, itemTwo);
            this.refs.itemOne.value = '';
            this.refs.itemTwo.value = '';
        }

    }

    showAll() {
        this.props.showAll
            ? Session.set('showAll', false)
            : Session.set('showAll', true);
    }

    render() {
        if (!this.props.itemsReady) {
            return <div>Loading..</div>
        }
        return (
            <div>
           {/* <IsRole role="admin"> </IsRole>*/}
            <button
                    onClick={this
                    .showAll}>
                    show {this.props.showAll
                        ? 'one'
                        : 'all'}
                </button>
                <main>
                    <form
                        className="new-items"
                        onSubmit={this
                        .addItems}>
                        <input type="text" ref="itemOne"/>
                        <input type="text" ref="itemTwo"/>
                        <button type="submit">Add Items</button>
                    </form>
                    {this
                        .props
                        .items
                        .map(function (item) {
                            return <Item item={item} key={item._id}/>
                        })}
                </main>
            </div>

        )
    }
}


// // a wrapper to reactively sync data between server and client.
// export default createContainer(function () {
//     let itemSub = Meteor.subscribe('allItems');
//     let showAll = Session.get('showAll');
//     return {
//         showAll,
//         itemsReady: itemSub.ready(),
//         items: Items.find({}, {
//             limit: showAll
//                 ? 50
//                 : 1,
//             sort: {
//                 lastUpdated: 1
//             }
//         }).fetch()
//     }
// }, App)