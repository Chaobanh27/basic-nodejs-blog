const BlogPost = require('../models/BlogPost')
const path = require('path')


const newPost = (req,res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.redirect('/posts/create')
    }
    let image = req.files.image
    let uploadPath = path.join(__dirname, '..', 'public', 'img', image.name);
    image.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
        console.log('File uploaded!');
    })
    image.mv(uploadPath,
    (err) => {
        if(err) {
            return res.status(500).send(err);
        }
        BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        .then(() => {
            console.log('upload successfully !')
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
        })
    })
}

module.exports = newPost