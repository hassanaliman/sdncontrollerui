<template>
    <div class="accordion mt-4 mb-4" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        Controller Applications
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body">
        <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">App ID</th>
                    <th scope="col">App Name</th>
                    <th scope="col">App Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in content.applications" :key="index">
                    <td scope="col">
                        {{ item["id"] }}
                    </td>
                    <td scope="col">
                        {{ item["name"] }}
                    </td>
                    <td scope="col">
                        {{ item["description"] }}
                    </td>
                    <td scope="col">
                        <p v-show="item['state'] == 'ACTIVE'" style="color: green; font-weight: bold;">{{ item['state'] }}</p>
                        <p v-show="item['state'] == 'INSTALLED'">{{ item['state'] }}</p>
                    </td>
                    <td scope="col">
                        <button type="button" v-show="item['state'] == 'INSTALLED'" class="btn btn-primary" @click="activateApp(item['name'])">Activate</button>
                        <button type="button" v-show="item['state'] == 'ACTIVE'" class="btn btn-danger" @click="deActivateApp(item['name'])">Deactivate</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
</template>

<script>
import UserService from "../services/user.service";

export default {
    name: "ConfigPage",
    data() {
        return {
            content: "",
            activateAppmsg: "",
            activateAppSuccess: false,
        }
    },
    mounted() {
        UserService.getConfig().then((response) => {
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
    },
    methods: {
        activateApp(name) {
            UserService.activateApp(name).then((response) => {
                this.activateAppmsg = response.data;
                this.activateAppSuccess = true;
                this.updateData();
                console.log(this.activateAppmsg);
            });
        },
        deActivateApp(name) {
            UserService.deActivateApp(name).then((response) => {
                this.activateAppmsg = response.data;
                this.activateAppSuccess = true;
                this.updateData();
                console.log(this.activateAppmsg);
            });
        },
        updateData() {
            UserService.getConfig().then((response) => {
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
}
</script>