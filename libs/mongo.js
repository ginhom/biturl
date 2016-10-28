'use strict';

const bluebird = require( 'bluebird' );
const mongoose = require( 'mongoose' );
const config   = require( '../config/db' );
const schema   = new mongoose.Schema( {
    _id : {
        type : Number,
        index: {
            unique: true
        }
    },
    url : String,
    hash: {
        type : String,
        index: {
            unique: true
        }
    },
    date: Date
} );
const model    = mongoose.model( config.table, schema );

mongoose.Promise = bluebird;

class Mongo {
    constructor() {
        mongoose.connect( `${config.host}:${config.port}/${config.db}` );
    }

    *create( id, url, hash ) {
        let Url = new model();

        Url._id  = id;
        Url.url  = url;
        Url.hash = hash;
        Url.date = (new Date());

        return yield Url.save();
    }

    static *find( hash ) {
        return yield model.find( {hash: hash} );
    }
}

module.exports = Mongo;
