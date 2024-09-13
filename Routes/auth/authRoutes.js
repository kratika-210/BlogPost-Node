const express=require('express')
const bodyParser=require('body-parser')
const User=require('../../models/user')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const router=express.Router();

router.get('/login', (req, res) => {
    const error = req.query.error;
    res.render('auth/login', { title: 'Login', error });
});

router.get('/signup', (req, res) => {
    const error = req.query.error;
    res.render('auth/signup', { title: 'Sign Up', error });
});


// Middleware to parse form data
router.use(bodyParser.urlencoded({ extended: true }));
// Use the cookie parser middleware
router.use(cookieParser());

// Signup route POST
router.post('/signup', (req, res) => {
    const obj = req.body;
    console.log(obj);
    User.create(obj)
        .then(user => {
            console.log('User created successfully');
            const token = getToken(user.email, user.name, user._id);
            res.cookie('authtoken', token);
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/auth/signup?error=Error creating user');
        });
});

function getToken(email, name, id) {
    const secret = "veryComplexSecret";
    const token = jwt.sign({ email, name, id }, secret);
    return token;
}

// Login route POST
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.redirect('/auth/login?error=User not found');
            }
            else if (user.password !== password) {
                return res.redirect('/auth/login?error=Incorrect password');
            }
            else {
                console.log('User logged in successfully');
                const token = getToken(user.email, user.name, user._id);
                res.cookie('authtoken', token);
                res.redirect('/blogs');
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/auth/login?error=Error logging in');
        });
});

// Logout route GET
router.get('/logout', (req, res) => {
    res.clearCookie('authtoken');
    res.redirect('/');
});


module.exports = router;
