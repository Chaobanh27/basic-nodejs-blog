const validateMiddleware = (err,req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.title == null) {
        return res.redirect('/posts/create-post')
    } 
    next()
}
module.exports = validateMiddleware