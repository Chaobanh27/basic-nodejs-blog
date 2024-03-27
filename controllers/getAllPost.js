const BlogPost = require('../models/BlogPost')


const allPosts = (req,res) => {
    BlogPost.find({})
    .then((data) => {
        res.render('index',{
            blogPosts: data
        })
    })
    .catch((err) => {
        console.error('error !',err)
    })
}

module.exports = allPosts