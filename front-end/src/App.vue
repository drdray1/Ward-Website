<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <router-link to="/" class="navbar-brand">Ward Website</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <!--<li class="nav-item">
            <router-link to="/message_board" class="nav-link">Message Board</router-link>
          </li>-->
          <li class="nav-item">
            <router-link to="/members" class="nav-link">Members</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">Create Profile</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view/>
      <div class="footer mt-4">
        <a href="https://github.com/drdray1/Ward-Website" target="1">Github</a>
      </div>
    </div>
  </div>
</template>

<style></style>
