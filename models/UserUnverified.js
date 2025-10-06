const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserUnverifiedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'], 
    },
    
    telephone: {
        type: String,
        required: [true, 'Please add a telephone number'],  
        match: [
            /^(\+?[1-9]\d{1,14}|0\d{8,9})$/,
            'Please add a valid telephone number'
        ]
    },
    email: {
        type: String,
        required: [true, 'Please add an email'], 
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user', 
    },
    password: {
        type: String,
        required: [true, 'Please add a password'], 
        minlength: 6, 
        select: false 
    },
    verificationToken: {
        type: String,
        required: true
    },
    verificationExpire: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 3600 // Document will be automatically deleted after 1 hour if not verified
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

//Encrypt password using bcrypt
UserUnverifiedSchema.pre('save',async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt (10);
    this.password=await bcrypt.hash(this.password,salt);
});

module.exports = mongoose.model('UserUnverified', UserUnverifiedSchema);
