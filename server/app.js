const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const create = require('./routers/create')
const { getAll, getMyToken } = require('./routers/getTokens')
var multer = require('multer');
const buyToken = require('./routers/buy');

const app = express()
const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, './uploads/')
    },
    filename: function(req,file,cb) {
        cb(null, (new Date()) + file.originalname)
    }
})

const fileFilter = (req,file,cb) => {
    //recieve a file
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null,false)
    }
}

const upload = multer({
    storage:storage,
    limits: {
        fileSize: 1024*1024*10
    },
    fileFilter:fileFilter
})

// Enable all cors request
app.use(cors())

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(bodyParser.json({
    limit: '50mb'
}));
  
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
}));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

// Set up mongoose connection
password=1234
let dev_db_url = 'mongodb+srv://test-user:'+password+'@cluster0.hntoj.mongodb.net/NFT?retryWrites=true&w=majority';

let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB , {
    useNewUrlParser: true, useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use('/uploads',express.static('uploads'));


/**
 * Routers 
 * */


app.get('/', (req, res) => {
    res.send('working')
})
app.post('/api/create', upload.single('image') ,create)
app.get('/api/get-all', getAll)
app.post('/api/get-my-token', getMyToken)
app.post('/api/buy-token', buyToken)

// app.get('api/*', catch404)

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})