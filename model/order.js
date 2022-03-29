const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
    {
        customer_id: [{ type:Schema.Types.ObjectId, required: true, ref: "Customer" }],
        order_date:{type: Date}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", OrderSchema);
