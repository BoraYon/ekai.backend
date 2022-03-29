const Customer = require("../model/customer");

exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
        .then(book => {
            if(!book) {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });
            }
            res.send(book);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).json({
            message: "Error retrieving Customer with id " + req.params.customerId
        });
    });
};

exports.findAll = (req, res) => {
    Customer.find()
        .then(customers => {
            res.status(200).json({ message: "Customers retrived!", data: customers });
        }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving customers."
        });
    });
};

exports.create = (req, res) => {

        if(!req.body.name || !req.body.email) {
            return res.status(400).send({
                message: req.body
            });
        }
        //need control kind and price !!
        const customer = new Customer({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone
        });

    customer.save()
            .then(data => {
                res.status(201).json({ message: 'Customer created!', data: data });
            }).catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Customer."
            });
        });

};
