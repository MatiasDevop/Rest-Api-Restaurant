const express = require("express");
const morgan = require('morgan');


const app = express();


app.set('port', process.env.PORT || 4000)


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Global Varibles
app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
     err.status = 404;
     next(err);*/
  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    // Pass to next layer of middleware
    next();
  });
 /*******CORS END */ 
//Routes
app.use(require('./routes/router'));

//starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
   });