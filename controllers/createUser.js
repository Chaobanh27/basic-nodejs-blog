const User = require('../models/User')

const createUser = (req, res) => {
    User.create(req.body)
    .then((data) => {
        console.log('New User: ',data)
        res.redirect('/')
    })
    .catch((err) => {
        console.log(err)
    })

}

module.exports = createUser