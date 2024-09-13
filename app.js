const express=require('express');
const cookieParser = require('cookie-parser');
const morgan=require('morgan')
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const blogpostRoutes=require('./Routes/blogRoutes');
const authRoutes=require('./Routes/auth/authRoutes');
const app=express();

require('dotenv').config();
const port=5000;

app.use(express.static('public'))
const dbURI = process.env.dbURI;
mongoose.connect(dbURI)
.then((result)=>{
    console.log(`Connected to the database`);
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    });
})
.catch((err)=>{
    console.log('Failed to connect to database');
    process.exit(1);
})

//setting the view engine //
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());



//function to check if the user is logged in or not //
function checkUser(req, res, next) {
    const token = req.cookies.authtoken;
    console.log(token);
    if (token) {
        jwt.verify(token, 'veryComplexSecret', (err, decodedToken) => {
            if (err) {
                console.log(`Token is incorrect: ${err}`);
                res.locals.user = null;
            } else {
                // Token is correct
                res.locals.user = decodedToken; 
            }
        });
    } else {
        res.locals.user = null;
    }
    next();
}
app.use(checkUser);


app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// auth routes
app.use('/auth', authRoutes);

// blog routes
app.use('/blogs', blogpostRoutes);

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('error', { title: 'Error' });
});
