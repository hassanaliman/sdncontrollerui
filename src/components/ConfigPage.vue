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
        Port Configuration
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
      <div class="accordion-body">
        <!-- <ul v-for="(item2, index2) in devices.devices" :key="index2">
            <li>{{ item2.id }}</li>
        </ul> -->
        <strong>Choose Device:</strong>
    <select required
      v-model="selected"
      class="form-select mb-3"
      aria-label="Select a device"
    >
      <option
        v-for="(device, indexDevice) in devices.devices"
        v-bind:value="{ id: device.id, text: device.hw }"
        :key="indexDevice"
      >
        {{ device.id }}
      </option>
    </select>
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
            devices: "",
            selected: "",
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

        UserService.getDevice().then((response) => {
            this.devices = response.data;
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