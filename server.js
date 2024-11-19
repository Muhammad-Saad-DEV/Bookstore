const express = require("express");
const app = express();
const port = 3000;
const path = require("path");                                   //requiring path for using multiple folders
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")
const {validate, authSchema} = require("./views/validation")


app.set("view engine" , "ejs");                                 //setting view engine
app.set("views", path.join(__dirname, "views"));                //setting path for views folder

app.use(express.static(path.join(__dirname, "public")));        //setting path for public folder

app.use(express.urlencoded({extended:true}));                   //middleware for reading data from front-end or client side
app.use(express.json());
app.use(methodOverride('_method'))


let books = [
    {
        id : uuidv4(),
        title : "Harry Potter and the Half Blood Prince",
        author : "J.K Rowling",
        description : "Book Description",
        published_year : "2005",
        genre : "Fantasy, Thriller"
    },
    {
        id : uuidv4(),
        title : "The Lord of the Rings",
        author : "J.R.R. Tolkien",
        description : "Book Description",
        published_year : "1954",
        genre : "Fantasy, Thriller"
    }
];

app.get('/books', (req, res) => {
    res.render("index.ejs", {books});                           //using render to get data from our ejs file in views folder
});

app.get('/books/new', (req,res) =>{
    res.render("new.ejs")
});

app.post("/books", validate(authSchema), (req,res) =>{
    let{title, author, description, published_year, genre} = req.body;
    let id = uuidv4();
    books.push({id, title, author, description, published_year, genre});
    res.redirect("/books");
});

app.get("/books/:id", (req,res) =>{                 //showing a book through ID
    let {id} = req.params;
    let book = books.find((b) => id === b.id);
    if (!book) {                                    //error message is the book is not found
        return res.status(404).render("error", { 
            errorCode: 404, 
            errorMessage: "Book not found" 
        });
    }
    res.render("show.ejs", {book});
});

app.patch("/books/:id", (req,res) =>{               //adding a new book
    let{id} = req.params;
    let {title, author, description, published_year, genre } = req.body;
    let book = books.find((b) => id === b.id);
    book.title = title;
    book.author = author;
    book.description = description;
    book.published_year = published_year;
    book.genre = genre;

    console.log(book);
    res.redirect("/books");
})

app.get("/books/:id/edit", (req, res) =>{           //to edit a listing
    let{id} = req.params;
    let book = books.find((b) => id === b.id);
    if (!book) {
        return res.status(404).render("error", {    // Render the error page if the book is not found
            errorCode: 404, 
            errorMessage: "Book not found" 
        });}
    res.render("edit.ejs", {book});
})

app.delete("/books/:id", (req, res) =>{             //to delete listing
    let{id} = req.params;
    books = books.filter((b) => id !== b.id);
    if (books === -1) {
        return res.status(404).render("error", { 
            errorCode: 404, 
            errorMessage: "Book not found" 
        });
    }
    
    res.redirect("/books");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});


