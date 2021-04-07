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
    profile: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile'
    },
    text: String,
});

const Message = mongoose.model('Message', messageSchema);

// This is a CRUD api
// PROFILE FUNCTIONS
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

// Read/Get a single profile
app.get('/api/profiles/:profileID', async(req, res) => {
    try {
        let profile = await Profile.findOne({_id: req.params.profileID});
        if (!profile) {
            res.send(404);
            return;
        }
        res.send(profile);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

// Update Profile
app.put('/api/profiles/:profileID', async(req, res) => {
    try {
        let profile = await Profile.findOne({_id:req.params.profileID});
        if (!profile) {
            res.send(404);
            return;
        }
        profile.age = req.body.age;
        profile.address = req.body.address;
        profile.email = req.body.email;
        profile.about = req.body.about;
        profile.save();
        res.send(profile);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete Profile
app.delete('/api/profiles/:id', async(req, res) => {
    try {
        await Profile.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

// MESSAGE FUNCTIONS
// Create Message
app.post('/api/profiles/:profileID/messages', async(req, res) => {
   try {
       let profile = await Profile.findOne({_id: req.params.profileID});
       if (!profile) {
           res.send(404);
           return;
       }
       let message = new Message({
           profile: profile,
           text: req.body.text,
       });
       await message.save();
       res.send(message);
   } catch (error) {
       console.log(error);
       res.sendStatus(500);
   }
});

// Read/Get list of messages
app.get('/api/profiles/:profileID/messages', async (req, res) => {
    try {
        let profile = await Profile.findOne({_id: req.params.profileID});
        if (!profile) {
            res.send(404);
            return;
        }
        let messages = await Message.find({profile:profile});
        res.send(messages);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete Message
app.delete('/api/profiles/:profileID/messages/:messageID', async(req, res) => {
    try {
        let message = await Message.findOne({_id:req.params.messageID, profile: req.params.profileID});
        if (!message) {
            res.sendStatus(404)
            return;
        }
        await message.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.listen(3000, () => console.log('Todo server listening on port 3000!'));