/**
 * @Author: krishna_aim24@yahoo.com (Krishna Kumar)
 * @require: [Angular, jQuery, require]
 * @Date - APR 20, 2015
 */

var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var app = express();

app.use(express.static(__dirname + '/public'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rlprototype');

mongoose.model('category', new mongoose.Schema({}, {
    collection: 'rlcategory'
}));
mongoose.model('products', new mongoose.Schema({}, {
    collection: 'products'
}));

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.get('/category', function(request, response) {
    mongoose.model('category').find(request.query, function(err, data) {
        response.json(data);
    });
});

app.get('/products', function(request, response) {
    var _counter = 0,
        _customQueryObject = {
            $and: []
        };

    for (var property in request.query) {
        if (property === 'rating') {
            if (typeof request.query.rating === 'string') {
                request.query.rating = parseInt(request.query.rating, 10);
            } else {
                if (request.query.rating.join) {
                    request.query.rating.forEach(function(elem, index) {
                        request.query.rating[index] = parseInt(elem, 10);
                    });
                }
            }
        }

        _customQueryObject.$and.push({
            $or: []
        });
        
        if (request.query[property].join) {
            for (var i = 0; i < request.query[property].length; i++) {
                var _temp = {};
                _temp[property] = request.query[property][i];
                _customQueryObject.$and[_counter].$or.push(_temp);
            }
            _counter++;
        } else {
            var _temp = {};
            _temp[property] = request.query[property];
            _customQueryObject.$and[_counter].$or.push(_temp);
            _customQueryObject.$and[_counter].$or.push(_temp);
            _counter++;
        }
    }

    mongoose.model('products').find(_customQueryObject, function(err, data) {
        response.json(data);
    });
});

/* end get requests block */
app.listen(3000);