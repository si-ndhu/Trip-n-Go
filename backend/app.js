var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactUsRouter = require('./routes/contact_us');
var paymentRouter = require('./routes/payment');
const wishlistRouter = require('./routes/wishlist');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var dashboardRouter = require('./routes/dashboard');
var moretripsRouter = require('./routes/moretrips');
var notificationsRouter = require('./routes/notifications');
var { listenForNotifications } = require('./conn');
var EmailRouter = require('./routes/validateemail');
var ResetPassRouter = require('./routes/resetpass');
var adminloginRouter = require('./routes/adminlogin');
var profileRouter = require('./routes/profile');
var packageRouter = require('./routes/package');


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact-us', contactUsRouter);
app.use('/payment', paymentRouter);
app.use('/wishlist', wishlistRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/moretrips', moretripsRouter);
app.use('/notifications', notificationsRouter);
app.use('/validate-email', EmailRouter);
app.use('/reset-pass', ResetPassRouter);
app.use('/adminlogin', adminloginRouter);
app.use('/profile', profileRouter);
app.use('/package', packageRouter);


const endpointSecret = "whsec_5XLp9PVFgRGEvCWjkOwgV0gtaPcSyfn4";
app.post('/payment-callback', async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    console.log(event);

    res.sendStatus(200);
});

listenForNotifications();

module.exports = app;
