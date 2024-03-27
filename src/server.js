const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const fileUpload = require('express-fileupload')
const newPost = require('../controllers/createPost')
const pagePost = require('../controllers/pagePost')
const postDetail = require('../controllers/postDetail')
const allPosts = require('../controllers/getAllPost')

const validateMiddleware = require('../middlewares/validationMiddleware')
const newUserController = require('../controllers/newUser')
const createUserController = require('../controllers/createUser')
const loginController = require('../controllers/login')
const loginUserController = require('../controllers/loginUser')
const authMiddleware = require('../middlewares/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('../middlewares/redirectIfAuthenticatedMiddleware')
const logoutController = require('../controllers/logout')
const env = require('../config/enviroment')

const START_SERVER = () => {
    const app = express()
    const port = env.APP_PORT
    const host = env.APP_HOST
    /*
    body-parser.json() được sử dụng để phân tích và trích xuất dữ liệu được gửi dưới dạng JSON từ phần thân của yêu cầu. 
    Nếu yêu cầu chứa dữ liệu dưới dạng JSON, body-parser.json() sẽ phân tích nó và đưa vào thuộc tính req.body của yêu cầu để bạn có thể truy cập vào dữ liệu. 
    Điều này hữu ích khi bạn nhận được yêu cầu POST hoặc PUT với dữ liệu JSON.
     */
    app.use(bodyParser.json({ type: 'application/json' }))

    /*
    body-parser.urlencoded({ extended: true }) được sử dụng để phân tích và trích xuất dữ liệu từ phần thân của yêu cầu khi nó được gửi dưới dạng form data. 
    extended: true cho phép xử lý các đối tượng phức tạp hơn trong form data. Khi yêu cầu chứa dữ liệu form data, 
    body-parser.urlencoded() sẽ phân tích và đưa vào thuộc tính req.body để bạn có thể truy cập vào dữ liệu. 
    Điều này hữu ích khi bạn nhận được yêu cầu POST từ một form HTML.
     */
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.raw());
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(fileUpload())
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
      }))
    app.use('/posts/create', validateMiddleware)

    global.loggedIn = null;
    app.use('*', (req,res,next) => {
        loggedIn = req.session.userId
        next()
    })

    
    app.get('/', allPosts)

    app.get('/about', (req, res) => {  
        res.render('about')
    }) 
    app.get('/contact', (req, res) => {
          res.render('contact')
    }) 

    app.get('/post/:id', postDetail)
    app.get('/posts/create-post',authMiddleware, pagePost)
    app.post('/posts/create', authMiddleware , newPost)

    app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController) 
    app.post('/users/register', redirectIfAuthenticatedMiddleware , createUserController)
    app.get('/auth/login', redirectIfAuthenticatedMiddleware ,loginController)
    app.post('/users/login', redirectIfAuthenticatedMiddleware ,loginUserController)
    app.get('/auth/logout', logoutController)
    app.use((req,res) => {
        res.render('notFound')
    })
    app.listen(3000,() => {
      console.log(`Hello Chaobanh, I am running at http://${ host }:${ port }/`)
    })
}

console.log('Connecting to MongoDB CLoud Atlas...')

mongoose.connect(`${env.MONGODB_URI}`)
  .then(() => {
    console.log('connected to mongodb')
    START_SERVER()
  })
  .catch((err) => {
    console.error('Error connecting to MongoDb Atlas', err)
})

