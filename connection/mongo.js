let mongoose= require('mongoose')

let ConnectDb= mongoose.connect('mongodb://127.0.0.1:27017/url_shortner');

 module.exports= ConnectDb;