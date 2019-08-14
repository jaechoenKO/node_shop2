const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        // product은 필수값. require는 필수값 체크
        require: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("Order", orderSchema);