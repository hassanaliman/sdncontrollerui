<template>
    <div class="container">
        <header class="jumbotron">
            <h3>
                <strong>{{ `${currentUser.username}'s` }}</strong> Profile
            </h3>
        </header>
        <p>
            <strong>
                Id: 
            </strong>
            {{ currentUser.id }}
        </p>
        <p>
            <strong>Email: </strong>
            {{ currentUser.email }}
        </p>
        <p>
            {{ currentUser }}
        </p>
        <p>
            <strong>Role: </strong>
            <ul>
                <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
            </ul>
        </p>
    </div>
</template>

<script>
export default {
    name: "ProfilePage",
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push("/login");
        }
    }
}
</script>