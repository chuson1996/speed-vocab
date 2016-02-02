var mongoose = require('mongoose');
var roleStates = 'admin customer'.split(' ');
var userSchema = mongoose.Schema({
    authId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: String,
    role: {
        type: String,
        enum: roleStates
    },
    avatar: String,
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});
var User = mongoose.model('User',userSchema);
module.exports = User;