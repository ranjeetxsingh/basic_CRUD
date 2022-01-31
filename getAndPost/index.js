const express = require("express");
const app = express();

app.use(express.urlencoded({
    extended: true
}));

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