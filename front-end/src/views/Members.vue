<template>
  <div>
    <div class="jumbotron jumbotron-fluid rounded">
      <div class="container">
        <h1 class="display-4">Members</h1>
        <p class="lead">See all member profiles</p>
      </div>
    </div>
    <div v-for="profile in profiles" :key="profile.id">
      <div class="card">
        <div class="card-header lead">
          <strong>{{profile.first_name}} {{profile.last_name}}</strong>
          <em> {{profile.age}}</em>
        </div>
        <div class="card-body">
          <p class="card-title">Email: {{profile.email}}</p>
          <p class="card-text">Address: {{profile.address}}</p>
          <p class="card-text">Birthday: {{profile.birthday}}</p>
          <p class="card-text">About: {{profile.about}}</p>
        </div>
        <div class="card-footer lead">
          <strong>Written Messages</strong>
        </div>

        <form>
          <div class="form-group m-3">
            <label for="messageTextArea">New Message</label>
            <input class="form-control" id="messageTextArea" type="text" v-model="message">
          </div>
          <button type="button" class="btn btn-success">Post Message</button>
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
      message: '',
    }
  },
  created() {
    this.getProfiles();
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
  }
}
</script>

<style scoped>

</style>