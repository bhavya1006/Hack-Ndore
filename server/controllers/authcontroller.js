//const User = require("../models/usermodel");
//const bcrypt = require("bcryptjs");

const registerUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        return res.status(400).send(error)
    }

}

const loginUser = async (req, res, next) => {
    try {

    }
    catch (error) {
        return res.status(400).send(error)
    }
}

module.exports = { registerUser, loginUser, tokenLogin, check }