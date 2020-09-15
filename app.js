var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

var ejs = require('ejs')

var indexRouter = require('./routes/index');
var signInOutRouter = require('./routes/signInOut');
var signUpRouter = require('./routes/signUp');
var moviesRouter = require('./routes/movie');

var app = express();

//Session 
app.use(session({
  secret: 'cursodenode', //chave para gerar a chave da sessao. 
  resave: true, // primeiro ressalva o cookie de sessão a cada requisição
  saveUninitialized: true //salva dados das sessoes anonimas
}))
app.use(flash())

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({extended: false})) 

app.use('/', indexRouter);
app.use('/signinout', signInOutRouter);
app.use('/signUp', signUpRouter);
app.use('/movie', moviesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Server connection
app.listen(5019, (err) => {
  if (err) {
      console.log(err)
  }
  console.log('Server connect at 5019 PORT')
})

module.exports = app;
