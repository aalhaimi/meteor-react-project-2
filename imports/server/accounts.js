Accounts.onCreateUser(function (options, user) {
        if (options.email === 'a.alhaimi1@gmail.com') {
            user.roles = ['admin'];
        }
        return user;
    })