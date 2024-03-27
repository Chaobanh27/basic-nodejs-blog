const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req,res) => {
    const { username,password } = req.body
    User.findOne({ username: username} )
    .then((user) => {
        const match = bcrypt.compare(password,user.password)
        if(match){
            req.session.userId = user._id 
            res.redirect('/')
        }
        else{
            res.redirect('/auth/login')
        }
    })
    .catch((err) => {
        res.redirect('/auth/login')
    })
}