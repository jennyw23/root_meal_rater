'use strict';

module.exports = function(app) {
    var jwt = require('express-jwt');

    // JSONWebToken stuff https://auth0.com/learn/token-based-authentication-made-easy/
    var jwtCheck = jwt({
        secret: Buffer.from('{YOUR-APP-SECRET}', 'base64'),
        audience: '{YOUR-APP-CLIENT-ID}',
        algorithms: ['HS256']
    });
    app.use('/api', jwtCheck);


    const { auth } = require('express-openid-connect');

    const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'c3c2917957853c46f8227e15656a86ea3bfe4c97916df618814d4282c0543137',
    baseURL: 'http://localhost:3000',
    clientID: 'L2L3hjJbLyhKpQZuQBKZ2PwUyLAa4qnB',
    issuerBaseURL: 'https://jennyw23.us.auth0.com'
    };

    // auth router attaches /login, /logout, and /callback routes to the baseURL
    app.use(auth(config));

    // req.isAuthenticated is provided from the auth router
    app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    });

    const { requiresAuth } = require('express-openid-connect');

    app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
    });
}