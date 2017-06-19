import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from './App';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <div>
        <MainLayout>
          <Route exact path="/" component={App} />
        </MainLayout>
        <div>
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>, document.getElementById('render-target'));
});
