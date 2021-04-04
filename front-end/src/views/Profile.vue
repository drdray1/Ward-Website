<template>
  <div>
    <div class="jumbotron jumbotron-fluid rounded">
      <div class="container">
        <h1 class="display-4">Profile</h1>
        <p class="lead">Create or edit your ward profile!</p>
      </div>
    </div>
    <div v-if="profile">
      Your profile here
    </div>
    <div v-else>
      <form>
        <div class="form-group">
          <label for="exampleFormControlInput1">Email address</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" v-model="email">
        </div>
        <!--<div class="form-group">
          <label for="ageTextArea">How old are you?</label>
          <input class="form-control" id="ageTextArea" type="text" v-model="age">
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Tell us a little about you!</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="about"></textarea>
        </div>-->
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
          email: this.email,
          age: this.age,
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

<style scoped>

</style>