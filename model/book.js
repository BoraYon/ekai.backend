const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        price: { type: Number, required: true },
        kind: {type: String, required:true},
        price_factor:{ type: Number, required: false },
        total: {type: Number, required:true},
        total_sell: {type: Number, required:false}
    },
    {
        timestamps: true
    }
);

BookSchema.pre('save', function (next) {
    const inVal = this.get('price');
    if(parseInt(inVal) <= 50)
        this.price_factor = 1
    if(parseInt(inVal) >= 50 && parseInt(inVal) <= 100)
        this.price_factor = 2
    if(parseInt(inVal) > 100)
        this.price_factor = 3
    next();
});




module.exports = mongoose.model("Book", BookSchema);
