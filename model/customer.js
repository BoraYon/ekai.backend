const mongoose = require("mongoose");
//User içine ekle, user tablosuna user_type olarak eklenecek...
const CustomerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: false },
        phone: { type: Number, required: false }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Customer", CustomerSchema);
