var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
//TODO: Review https://mongoosejs.com/docs/validation.html

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true  } );
mongoose.set('useCreateIndex', true);

// Movie schema
var MovieSchema = new Schema({
    title: { type: String, required: true, unique: true },
    yearReleased: {type: Date, required: true},
    genre: {
        type: String,
        required: true,
        enum: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Thriller", "Western"]
    },
    actors: {type: [String], required: true, validate: [arrayLimit, '{PATH} array must be of size 3']},
    image: {type: String, default: "https://static.thenounproject.com/png/82078-200.png"}
});

function arrayLimit(val) {
    return val.length == 3;
}

// return the model
module.exports = mongoose.model('Movie', MovieSchema);