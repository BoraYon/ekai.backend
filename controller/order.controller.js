const Book = require('../model/book');
const Customer = require('../model/customer');
const Order = require('../model/order');
const OrderItem = require('../model/orderItem');

exports.create = (req, res) => {
    //res.status(201).json({message: 'Order Item created!', data: req.body});
    console.log(req.body)
    //const ratinga = await Book.find({_id}).populate("total_");
    //res.send(animals);
    let order = new Order({
        customer_id: req.body.customer_id //62423b7514e31814854c9efe
    });
    order.save()
        .then(data => {
            res.status(201).json({message: 'Order created!', data: data});
        }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the Order."
        });
    });

    for (const item of req.body.orde) {

        const order_item = new OrderItem({
            order_id:order._id, // 62422b61a4ac28b57057501c
            book_id: item.book_id //62422b61a4ac28b57057501b
        });

        order_item.save()
            .then(data => {
                res.status(201).json({message: 'Order Item created!', data: data});
            }).catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Order Item."
            });
        });
    }

};

exports.findAll = (req, res) => {
    Order.find()
        .then(orders => {
            res.status(200).json({ message: "Orders retrived!", data: orders });
        }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Orders."
        });
    });
};
