const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

        email: {
            type: String,
            required: true,
            unique: true
        },
        fullName:{
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }, 
        phoneNumber: {
            type: Number,
            required: true
        },
        dateOfBirth: {
            type: Date,
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