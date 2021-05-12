const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const {User} = require('./models/schema')

app.use(cors({origin: '*'}));
const http = require('http').Server(app)
app.use('/static', express.static('public'))
app.set('view engine', 'jade');

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// const session = require('express-session');
// const cookieParser = require('cookie-parser');

// io.origins('*:*')
const mongoose = require('mongoose')
mongoose.Promise = Promise

const config = require('./env')


mongoose.connect(config.mongoUrl,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, (err) => {
        console.log('mongo db connection callback, error: ', err)
    })

app.use(function (req, res, next) {
    next();
});

const routes = require('./routes'); //导入自定义路由文件，创建模块化路由
app.use('/', routes);


const server = http.listen(7777, async () => {
    console.log('server is listening on port', server.address().port)
})
