var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
//TODO: Review https://mongoosejs.com/docs/validation.html

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true  } );
mongoose.set('useCreateIndex', true);

// Review schema
var ReviewSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User"},
    username: { type: String, required: false },
    movie_id: { type: Schema.Types.ObjectId, ref: "MovieSchema" },
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    image: {type: String, default: "https://image.shutterstock.com/image-illustration/missing-poster-600w-1396974.jpg" }
});

ReviewSchema.index({
    movie_id: 1,
    user_id: 1,
}, {
    unique: true,
});

ReviewSchema.pre('save', function(next) {
    next();
});

// return the model
module.exports = mongoose.model('Review', ReviewSchema);