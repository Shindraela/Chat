/*
Imports
*/
    // NodeJS
    const { Router } = require('express');

    // Inner
    const AuthRouterClass = require('./auth/auth.routes');
//

/*
Define routers
*/
    // Parent
    const mainRouter = Router({ mergeParams: true });
    const apiRouter = Router({ mergeParams: true });

    // Child
    const authRouter = new AuthRouterClass();
//

/*
Define routes
*/
    mainRouter.use('/api', apiRouter);
    apiRouter.use('/auth', authRouter.init());
//

/*
Export
*/
    module.exports = { mainRouter };
//