<template>
  <div>
    <div class="jumbotron jumbotron-fluid rounded">
      <div class="container">
        <h1 class="display-4">Message Board</h1>
        <p class="lead">Here you can read all ward messages!</p>
      </div>
    </div>
    <div v-for="profile in profiles" :key="profile.id">
    </div>
  </div>
</template>

<script>
export default {
name: "MessageBoard",
  data() {
    return {
      profiles: [],
    }
  },
  methods: {

  },
}
</script>

<style scoped>

</style>