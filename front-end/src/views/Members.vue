<template>
  <div>
    <div class="jumbotron jumbotron-fluid rounded">
      <div class="container">
        <h1 class="display-4">Members</h1>
        <p class="lead">See all member profiles</p>
      </div>
    </div>
    <div v-for="profile in profiles" :key="profile.id">
      <h3><em>{{profile.email}}</em></h3>
      <p>{{profile.age}}</p>
      <p>{{profile.about}}</p>
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