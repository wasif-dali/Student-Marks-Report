const express = require('express');
const route = require('./route/routes.js');
const mongoose = require('mongoose');
const app = express();
mongoose.set('strictQuery', false);

app.use(express.json());
mongoose.connect("", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route)

app.use("/*", function (req, res) {
    return res.status(400).send({
        status: false, message: "Make Sure Your Endpoint is Correct !!!"
    })
})


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});