const BlogPost = require('../models/BlogPost')


const postDetail = (req, res) => {
    let blogId = req.params.id
    BlogPost.findById(blogId)
    .then((data) => {
        res.render('post',{
            data
        }) 
    })
    .catch((err) => {
        console.error('error !',err)
    })
}

module.exports = postDetail