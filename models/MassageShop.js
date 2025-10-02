const mongoose = require('mongoose');

const MassageShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    telephone: {
        type: String,
        required: [true, 'Please add a telephone number'],
        match: [
            /^\+?[1-9]\d{1,14}$/,
            'Please add a valid telephone number'
        ]
    },
    openTime: {
        type: String,
        required: [true, 'Please add opening time'],
        match: [
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            'Please add valid time format (HH:MM)'
        ]
    },
    closeTime: {
        type: String,
        required: [true, 'Please add closing time'],
        match: [
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            'Please add valid time format (HH:MM)'
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MassageShop', MassageShopSchema);
