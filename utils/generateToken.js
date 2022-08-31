const jwt = require('jsonwebtoken');

module.exports.generateToken = (id)=>{
    return jwt.sign({id}, process.env.TOKEN, {expiresIn: 600})
};