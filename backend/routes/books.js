const {Router} = require("express"),
    {unlink} = require("fs-extra"),
    path = require("path"),
    Book = require("../models/Book"),
    router = Router();

router.get("/", async (req,res) => {
    const books = await Book.find();
    res.json(books)
})

router.post("/", async (req,res) => {
    const {title, author, isbn } = req.body;
    const imagePath = "/uploads/" + req.file.filename;
    const newBook = new Book({title, author, isbn, imagePath});
    await newBook.save()
    res.json({message: 'Book Saved'});
})

router.delete("/:id", async (req,res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public' + book.imagePath));
    res.json({message: 'Book Deleted'});
})

module.exports = router;