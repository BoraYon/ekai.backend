const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderItemSchema = new mongoose.Schema(
    {
        order_id: [{ type:Schema.Types.ObjectId, required: true, ref: "Order" }],
        book_id: [{ type:Schema.Types.ObjectId, required: true, ref: "Book" }],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("OrderItem", OrderItemSchema);
