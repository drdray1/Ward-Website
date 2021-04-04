const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// connect to the database
mongoose.connect('mongodb://localhost:27017/ward', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Profile Schema
const profileSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    address: String,
    email: String,
    age: String,
    birthday: String,
    about: String,
});

const Profile = mongoose.model('Profile', profileSchema);

// Message Schema
const messageSchema = new mongoose.Schema({
    _id: Number,
    message: String,
});

const Message = mongoose.model('Message', messageSchema);

// This is a CRUD api
// Create A Profile
app.post('/api/profiles', async(req, res) => {
    const profile = new Profile({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        email: req.body.email,
        age: req.body.age,
        birthday: req.body.birthday,
        about: req.body.about
    });
    try {
        await profile.save();
        res.send(profile);
        console.log("SERVER: Created Profile");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Read/Get a list of all profiles
app.get('/api/profiles', async (req, res) => {
    try {
        let profiles = await Profile.find();
        res.send(profiles);
        console.log("SERVER: Read Profiles");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Todo server listening on port 3000!'));