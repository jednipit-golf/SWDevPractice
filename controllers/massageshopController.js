const MassageShop = require('../models/MassageShop');
const Reservation = require('../models/Reservation');
// @desc    Get all massage shops
// @route   GET /api/v1/massageshops
// @access  Public
exports.getMassageShops = async (req, res, next) => {
    try {
        const massageShops = await MassageShop.find();
        res.status(200).json({
            success: true,
            count: massageShops.length,
            data: massageShops
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Cannot find Massage Shops" });
    }
};

// @desc    Get single massage shop
// @route   GET /api/v1/massageshops/:id
// @access  Public
exports.getMassageShop = async (req, res, next) => {
    try {
        const massageShop = await MassageShop.findById(req.params.id);
        if (!massageShop) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: massageShop });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Create new massage shop
// @route   POST /api/v1/massageshops
// @access  Private
exports.createMassageShop = async (req, res, next) => {
    const massageShop = await MassageShop.create(req.body);
    res.status(201).json({
        success: true,
        data: massageShop
    });
};

// @desc    Update massage shop
// @route   PUT /api/v1/massageshops/:id
// @access  Private
exports.updateMassageShop = async (req, res, next) => {
    try {
        const massageShop = await MassageShop.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!massageShop) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: massageShop });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Delete massage shop
// @route   DELETE /api/v1/massageshops/:id
// @access  Private
exports.deleteMassageShop = async (req, res, next) => {
    try {
        const massageShop = await MassageShop.findById(req.params.id);
        if (!massageShop) {
            return res.status(404).json({ 
                success: false,
                message: `Massage shop not found with id of ${req.params.id}`
            });
        }

        // Delete all reservations related to this massage shop
        await Reservation.deleteMany({ massageShop: req.params.id });

        // Delete the massage shop itself
        await MassageShop.deleteOne({ _id: req.params.id });

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};
