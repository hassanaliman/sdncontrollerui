<template>
    <div class="container" v-html="content">
    </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
    name: "HomePage",
    data() {
        return {
            content: ""
        };
    },
    mounted() {
        UserService.getPublicContent().then((response) => {
            this.content = response.data;
        },
        (error) => {
            this.content = 
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message || 
                error.toString();
        });
    }
}
</script>