const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

        email: {
            type: String,
            required: true,
            unique: true
        },
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }, 
        gender: {
            type: String,
            required: true
        },
        // previousPassword: [{
        //     type: String,
        //     required: false
        // }],
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
          },
    },
    { timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);