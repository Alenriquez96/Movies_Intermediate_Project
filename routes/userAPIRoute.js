const { Router } = require('express');
const userAPI = require('../controllers/userAPIController');
const routes = require('express').Router();
const passport = require('passport');


routes.get('/', userAPI.onLoad);
routes.get('/signup', userAPI.getSignUp);
routes.post('/signup', userAPI.signUpUser);
routes.get('/login', userAPI.getLogin);
routes.post('/login', userAPI.loginUser);
routes.get('/logout', userAPI.logoutUser)
routes.get('/recoverpassword/', userAPI.recoverPassView);
routes.post('/recoverpassword/',userAPI.recoverPass);
routes.get('/restorepassword/:recoverToken', userAPI.restorePassView);
routes.post('/restorepassword/:recoverToken',userAPI.restorePass);

routes.get('/google',userAPI.google);
routes.get('/auth/google',   passport.authenticate('google', { scope: [ 'email', 'profile' ] }));
routes.get('/google/callBack',passport.authenticate('google',{
    successRedirect: '/dashboard',
    failureRedirect: '/auth/failure'
}))
routes.get('/auth/failure',(req,res)=>{
    res.send('Something went wrong..')
});



module.exports = routes;
