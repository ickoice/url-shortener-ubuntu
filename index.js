const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const yup = require("yup");
const { nanoid } = require('nanoid');
const mongoose = require('mongoose');

var app = express();

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost/url-shortener';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Bind connection to error event (to get notification of connection errors)
db.once("open", function() {
    console.log("Connection Successful!");
});

require('dotenv').config();

app.use(express.json());
app.use(express.static('./public'));


app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());


var schema = mongoose.Schema({
    url: String,
    slug: String
});
  
var Model = mongoose.model("model", schema, "myCollection");

app.get('/:id', (req, res) => {

    const {id: slug} = req.params;
    
    try {
       
        Model.find({ 'slug': slug })
            .then(url=> {
                console.log(url);

                if (url[0]) {
                    console.log("here");
                    console.log(url[0].url);
                    
                    res.redirect(url[0].url).end();
                }
                console.log("now here");
                res.redirect(`/?error=${slug} not found what the fuck`).end();
            });
            // .catch(
            //     res.redirect(`/?error=${slug} not found`).end()
            // ); 

    } catch (error) {

        console.log(here);
        res.redirect(`/?error=Link not found`);
    }

});

app.post('/url', async (req, res, next) => {

    let { slug, url } = req.body;
    
    try {
    
        if (!slug) {
            slug = nanoid(5);
        } 
        slug = slug.toLowerCase();
        
        var url1 = new Model({ slug: slug, url: url });

        await url1.save(function(err, urlResponse) {
          if (err) return console.error(err);
          console.log("Document inserted succussfully!");

          const created = urlResponse;
          res.json(created);
        });
        
    } catch (error) {
        next(error);
    }
    
});

app.use((error, req, res, next) => {
    console.log("eroorrrrr");
    if (error.status){
        res.status(error.status);
    } else {
        res.status(500);
    }

    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'cake' : error.stack,
    });
});

const port = process.env.PORT || 1337;

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at http://localhost:${port}`);
});
