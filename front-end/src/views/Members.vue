<template>
  <div>
    <div class="jumbotron jumbotron-fluid rounded">
      <div class="container">
        <h1 class="display-4">Members</h1>
        <p class="lead">See all member profiles</p>
      </div>
    </div>
    <div v-for="profile in profiles" :key="profile._id">
      <div class="card">
        <div class="card-header lead">
          <strong>{{profile.first_name}} {{profile.last_name}}</strong>
          <em> age: {{profile.age}}</em>
        </div>
        <div class="card-body">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab" :href="'#home' + profile._id" role="tab" aria-controls="home" aria-selected="true">Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab" :href="'#profile' + profile._id" role="tab" aria-controls="profile" aria-selected="false">Edit</a>
            </li>
            <li class="nav-item">
              <a class="nav-link btn btn-outline-danger" @click="deleteProfile(profile)" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false">Delete</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" :id="'home' + profile._id" role="tabpanel" aria-labelledby="home-tab">
              <div class="m-2"></div>
              <p class="card-title">Email: {{profile.email}}</p>
              <p class="card-text">Address: {{profile.address}}</p>
              <p class="card-text">Birthday: {{profile.birthday}}</p>
              <p class="card-text">About: {{profile.about}}</p>
            </div>
            <div class="tab-pane fade" :id="'profile' + profile._id" role="tabpanel" aria-labelledby="profile-tab">
              <form @submit.prevent="editProfile(profile)">
                <div class="form-group">
                  <label for="exampleFormControlInput1">Email address</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="email">
                </div>
                <div class="form-group">
                  <label for="ageTextArea">How old are you?</label>
                  <input class="form-control" id="ageTextArea" type="text" v-model="age">
                </div>
                <div class="form-group">
                  <label for="addressTextArea">What is your address?</label>
                  <input class="form-control" id="addressTextArea" type="text" v-model="address">
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Tell us a little about you!</label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="about"></textarea>
                </div>
                <button type="submit" class="btn btn-warning">Edit!</button>
              </form>
            </div>
          </div>
        </div>
        <div class="card-footer lead">
          <strong>Written Messages</strong>
        </div>
        <!--<div v-if="getMessages(profile)"></div>-->
        <div v-for="message in messages" :key="message._id">
          <div v-if="profile._id === message.profile" class="ml-3">
            {{message.text}}
            <button @click="deleteMessage(profile, message)" class="btn-sm btn-danger btn-sm m-2">Delete</button>
          </div>
        </div>

        <form @submit.prevent="writeMessage(profile)">
          <div class="form-group m-3">
            <label :for="'messageTextArea' + profile._id">New Message</label>
            <input class="form-control" :id="'messageTextArea' + profile._id" type="text" >
          </div>
          <button type="submit" class="btn btn-success btn-sm m-2">Write!</button>
        </form>
      </div>
      <div class="m-5"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
name: "Members",
  data() {
    return {
      profiles: [],
      messages: [],
      email: "",
      about: "",
      age: "",
      address: "",
    }
  },
  created() {
    this.getProfiles();
    this.getMessagesInit();
  },
  methods: {
    async getProfiles() {
      try {
        let resp = await axios.get("/api/profiles");
        this.profiles = resp.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editProfile(profile) {
      try {
        await axios.put("/api/profiles/" + profile._id, {
          email: this.email,
          about: this.about,
          age: this.age,
          address: this.address,
        });
        this.email = "";
        this.about = "";
        this.age = "";
        this.address = "";
        await this.getProfiles();
        console.log("SERVER: Edited Profile")
        return true;
      } catch(error) {
        console.log(error);
      }
    },
    async writeMessage(profile) {
      try {
        await axios.post('/api/profiles/' + profile._id + '/messages', {
          text: document.getElementById('messageTextArea' + profile._id).value,
        });
        await this.getMessages(profile);
      } catch(error) {
        console.log(error);
      }
    },
    async getMessages(profile) {
      try {
        const response = await axios.get('/api/profiles/' + profile._id + '/messages');
        this.messages = response.data;
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getMessagesInit() {
      try {
        const response = await axios.get('/api/messages');
        console.log(response);
        this.messages = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMessage(profile, message){
      try {
        await axios.delete('/api/profiles/' + profile._id + '/messages/' + message._id);
        await this.getMessages(profile);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProfile(profile) {
      try {
        await axios.delete('/api/profiles/' + profile._id);
        await this.getProfiles();
      } catch(error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>