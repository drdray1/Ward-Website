<template>
  <div>
    <div class="jumbotron jumbotron-fluid rounded">
      <div class="container">
        <h1 class="display-4">Message Board</h1>
        <p class="lead">Here you can read all ward messages!</p>
      </div>
    </div>
    <div v-for="profile in profiles" :key="profile.id">
      <div v-for="message in messages" :key="message.id">
        {{message.text}}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "MessageBoard",
  data() {
    return {
      profiles: [],
      messages: [],
      message: "",
    }
  },
  created() {
    this.profiles = this.getProfiles();
    for (let i = 0; i < this.profiles.length; i++) {
      this.messages.push(this.getMessages(this.profiles[i]))
    }

  },
  computed: {
    updateMessages() {
      return this.messages;
    }
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
    async writeMessage(profile) {
      try {
        await axios.post('/api/profiles/' + profile._id + '/messages', {
          text: this.message,
        });
        this.message = "";
        this.getMessages(profile);
      } catch(error) {
        console.log(error);
      }
    },
    async deleteMessage(profile, message){
      try {
        await axios.delete('/api/profiles/' + profile._id + '/messages/' + message._id);
        this.getMessages();
      } catch (error) {
        console.log(error);
      }
    },
    async getMessages(profile) {
      try {
        const response = await axios.get('/api/profiles/' + profile._id + '/messages');
        this.messages = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>