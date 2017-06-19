import React from 'react';
import {Link} from 'react-router-dom';
import { Accounts } from 'meteor/std:accounts-ui';

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY_NO_PASSWORD',
  loginPath: '/',
});

const MainLayout = function ({children}) {
    return (
        <div className="main-layout">
            <header>
                <Link to="/">
                    <h1>level one coding</h1>
                </Link>
                 <Accounts.ui.LoginForm />
                <nav>
                    <Link to="/about">About</Link>
                </nav>
            </header>
            {children}
        </div>
    )
}

export default MainLayout;