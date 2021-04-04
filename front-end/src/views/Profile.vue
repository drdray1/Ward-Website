<template>
  <div>
    <div class="jumbotron jumbotron-fluid rounded">
      <div class="container">
        <h1 class="display-4">Profile</h1>
        <p class="lead">Create or edit your ward profile!</p>
      </div>
    </div>
    <div v-if="profile">
      <h2>Welcome back <span class="badge badge-secondary">{{profile.first_name}}</span></h2>
    </div>
    <div v-else>
      <h2>You're new here! <span class="badge badge-secondary">Welcome</span></h2>
      <form>
        <div class="form-group">
          <label for="exampleFormControlInput1">Email address</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="email">
        </div>
        <div class="form-group">
          <label for="firstNameTextArea">First Name</label>
          <input class="form-control" id="firstNameTextArea" type="text" v-model="first_name">
        </div>
        <div class="form-group">
          <label for="lastNameTextArea">Last Name</label>
          <input class="form-control" id="lastNameTextArea" type="text" v-model="last_name">
        </div>
        <div class="form-group">
          <label for="ageTextArea">How old are you?</label>
          <input class="form-control" id="ageTextArea" type="text" v-model="age">
        </div>
        <div class="form-group">
          <label for="birthdayTextArea">When is your birthday?</label>
          <input class="form-control" id="birthdayTextArea" type="text" v-model="birthday">
        </div>
        <div class="form-group">
          <label for="addressTextArea">What is your address?</label>
          <input class="form-control" id="addressTextArea" type="text" v-model="address">
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Tell us a little about you!</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="about"></textarea>
        </div>
        <button @click="createProfile" class="btn btn-warning">Create!</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
name: "Profile",

  data() {
    return {
      profile: null,
      about: '',
      email: '',
      age: '',
      first_name: '',
      last_name: '',
      address: '',
      birthday: '',
      addProfile: null,
      profiles: {},
    }
  },
  created() {
    this.getProfiles();
  },
  methods: {
    async createProfile() {
      try {
        let r1 = await axios.post('/api/profiles', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          age: this.age,
          birthday: this.birthday,
          address: this.address,
          about: this.about,
        });
        this.addProfile = r1.data;
        console.log("CLIENT: Profile Created");
      } catch(error) {
        console.log(error);
      }
    },
    async getProfiles() {
      try {
        let response = await axios.get('/api/profiles');
        this.profiles = response.data;
        console.log("CLIENT: Got Profile");
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped></style>