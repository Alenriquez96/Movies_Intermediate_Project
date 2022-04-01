const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const regex = require('../utils/regex');
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const config = require('../configs/config');
const express = require('express');
const db = require('../models/userAPIModel');



// TODO: aquí la lógica de negocio
const app = express();
app.set('llave', config.llave);


/* 
const loginUser = async (req, res) => {

    try {
        const loginUser = req.body; 
        const response = await db.loginUser(loginUser);
        res.status(201).json({"user_logged":response});
    } catch (error) {
        console.log('Error:', error);
    }  

}  */

const signUpUser = async (req, res) => {
    try {

        const newUser = req.body; // {} nuevo user a guardar
        const response = await db.signUpUser(newUser);
        res.status(201).json({"user_created":response});
    } catch (error) {
        console.log('Error:', error);
    }  
}



/* const recoverPassword = async (req, res) => {

}

const resetPassword = async (req, res) => {

}

const logoutUser = async (req, res) => {

} */


/* 
const users =  (async()=>{
   const u = await db.getUsers();
    console.log(u)
})(); */


const authUser = async(req,res)=> {
    const users = await db.getUsers();
    for (let i = 0; i < users.length; i++) {
    if(req.body.usuario == users[0].name && req.body.contrasena == users[0].password) {
        const payload = {
         check:  true
        };
        const token = jwt.sign(payload, app.get('llave'), {
         expiresIn: 1440
        });
         res.json({
         mensaje: 'Autenticación correcta',
         token: token
        });
    } else {
              res.json({ mensaje: "Usuario o contraseña incorrectos"})
          }
} 
}


const dataUser = async(req,res)=>{
    const datos = [
        { id: 1, nombre: "Pepe el de los palotes" },
        { id: 2, nombre: "Michel de Motril"}
       ];
       
       res.json(datos);
}


const user = {
    /* loginUser, */
    signUpUser,
    /*     recoverPassword,
        resetPassword,
        logoutUser */
    authUser,
    dataUser
}

module.exports = user;