/**
 * Created by Administrator on 2017/6/4.
 */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const db = require('./db.js');

const Schema = mongoose.Schema;

const UerSchema = new Schema({
    username:String,
    password:String,
    nick:String,
    email:String,
    args:Array,
    create_at:Date,
    update_at:Date
});


const User = mongoose.model('User',UerSchema);

module.exports = User;