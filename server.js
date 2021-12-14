const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');


const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'smart-brain'
    }
});

//  db.select('*').from('users').then(data => {
//      console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    //res.send("Server is online!")
    return db.select('*').from('users')
                    .then(user => {                        
                        res.json(user)
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
})

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => profile.handleGetProfile(req, res, db))
app.put('/image', (req, res) => image.handleImage(req, res, db))
app.post('/imageUrl', (req, res) => image.handleApiCall(req, res))

const port = 3001;
app.listen(port/*process.env.PORT*/, () => {
    console.log(`Server is running on port: ${port}`)
});
//Checking all the server funcyionality wPOith postman instead of out front-end
/*
/ (root) --> Result -> This is working
/signin  --> POST = sucess/fail
/register --> POST = new user
/profile/:userid --> GET = user
/image --> PUT --> user
*/