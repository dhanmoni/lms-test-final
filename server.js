const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const router = require('./router')
const path = require("path");

const app = express()

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// setting up cors, headers
// let allowCrossDomain = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT, DELETE');
//   // res.header(
//   //   'Access-Control-Allow-Headers',
//   //   'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
//   // );
//   next();
// };
// app.use(allowCrossDomain);
app.use(cors());

//connect to mongodb
mongoose.connect(process.env.MONGODB_ATLAS_URI,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    }
);

// port
const port = process.env.PORT || 5000;

app.use(router);

// For production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.resolve(__dirname, "./client/dist")));

  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});