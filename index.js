const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const {
    v4: uuidv4
} = require('uuid');
// import { v4 as uuid } from 'uuid';

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


let comments = [{
        id: uuidv4(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuidv4(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuidv4(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account , Todd'
    },
    {
        id: uuidv4(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    },
]


app.get('/comments', (req, res) => {
    res.render('comments/index', {
        comments
    });
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.get('/comments/:id', (req, res) => {
    const {
        id
    } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', {
        comment
    });
})

app.post('/comments', (req, res) => {
    const {
        username,
        comment
    } = req.body;
    comments.push({
        username,
        comment,
        id: uuidv4()
    });
    res.redirect('/comments');
})

app.get('/comments/:id/edit', (req, res) => {
    const {
        id
    } = req.params;
    const foundComment = comments.find(c => c.id === id);
    res.render('comments/edit', {
        foundComment
    });
})

app.patch('/comments/:id', (req, res) => {
    const {
        id
    } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const {
        id
    } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/tacos', (req, res) => {
    res.send("Get /tacos response");
})

app.post('/tacos', (req, res) => {
    // console.log(req.body);
    const {
        meat,
        qty
    } = req.body;
    res.send(`Ok here are your ${qty} ${meat} tacos`);
    // res.send("Post /tacos response");
})

app.listen(3000, () => {
    console.log('ON PORT 3000 !');
})