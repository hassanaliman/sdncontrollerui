<template>
  <div id="app">
    
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
        <a href="/" class="navbar-brand">Control-Plane Manager</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        <li v-if="showMonitoringPage" class="nav-item">
          <router-link to="/monitoring" class="nav-link">Monitoring</router-link>
        </li>
        <li v-if="showConfigPage" class="nav-item">
          <router-link to="/config" class="nav-link">Config</router-link>
        </li>
        
        
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Add User
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </div>
    </nav>
  

    <div class="container">
      <router-view />
    </div>
  </div>
  
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showConfigPage() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }
      return false;
    },
    showMonitoringPage() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_USER');
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
