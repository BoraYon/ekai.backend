const Book = require('../model/book');

exports.create = (req, res) => {
    req.body.forEach(item =>{
        if(!item.author || !item.title) {
            return res.status(400).send({
                message: item
            });
        }
        //need control kind and price !!
        const book = new Book({
            title: item.title,
            author: item.author,
            price: item.price,
            kind: item.kind,
            total: item.total
        });

        book.save()
            .then(data => {
                res.status(201).json({ message: 'Book created!', data: data });
            }).catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Book."
            });
        });
    })

};

exports.findAll = (req, res) => {
    Book.find()
        .then(books => {
            res.status(200).json({ message: "Books retrived!", data: books });
        }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving books."
        });
    });
};

exports.findOne = (req, res) => {
    Book.findById(req.params.bookId)
        .then(book => {
            if(!book) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            res.send(book);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });
        }
        return res.status(500).json({
            message: "Error retrieving book with id " + req.params.bookId
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title || !req.body.author) {
        return res.status(400).send({
            message: "Book title or author can not be empty"
        });
    }

    Book.findByIdAndUpdate(req.params.bookId, {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        kind: req.body.kind,
    }, {new: true})
        .then(book => {
            if(!book) {
                return res.status(404).json({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            res.status(200).json({ message : "Book updated!", data: book });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Book not found with id " + req.params.bookId
            });
        }
        return res.status(500).send({
            message: "Error updating book with id " + req.params.bookId
        });
    });
};

exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.bookId)
        .then(book => {
            if(!book) {
                return res.status(404).json({
                    message: "Book not found with id " + req.params.bookId
                });
            }
            res.status(202).json({message: "Book deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });
        }
        return res.status(500).json({
            message: "Could not delete book with id " + req.params.bookId
        });
    });
};
