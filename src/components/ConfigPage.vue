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
        <div class="container text-center">
            <div class="row">
                <div class="col">
                    <strong>Choose Device:</strong>
                    <select required
                        v-model="selected"
                        class="form-select mb-3 mt-3"
                        aria-label="Select a device"
                        placeholder="Choose a Device">
                    
                    <option
                        v-for="(device, indexDevice) in devices.devices"
                        v-bind:value="{ id: device.id, text: device.hw }"
                        :key="indexDevice">
                        {{ device.id }}
                    </option>
                    </select>
                </div>
    
                <div class="col">
                   <strong>Choose Port:</strong>
                    <div class="input-group mb-3 mt-3">
                    <input type="number" v-model="portnum" min="1" class="form-control" placeholder="Choose Port">
                </div>
            </div>
            
        <div class="col">
            <strong>Port Name:</strong>
            <div class="input-group mb-3 mt-3">
                <input type="text" v-model="portname" min="1" class="form-control" placeholder="Port Name">
            </div>
            </div>
        </div>
        </div>
        <button type="button" class="btn btn-primary" @click="configPort(selected.id, portnum, portname)">Submit Config</button>
        <div class="table-responsive mt-3">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">Device ID/port</th>
                    <th scope="col">Port Name</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(itemport, index2) in getconfig.ports" :key="index2">
                    <td scope="col">
                        {{ index2 }}
                    </td>
                    <td scope="col">
                        {{ itemport.interfaces[0].name }}
                    </td>
                     <td scope="col">
                        <button type="button" class="btn btn-danger" @click="delPort(index2)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
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
            portname: "",
            activateAppmsg: "",
            activateAppSuccess: false,
            portnum: "",
            portconfigmsg: "",
            getconfig:""
        }
    },
    mounted() {
        UserService.getApp().then((response) => {
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

        UserService.getConfig().then((response) => {
            this.getconfig = response.data;
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
        async activateApp(name) {
            await UserService.activateApp(name).then((response) => {
                this.activateAppmsg = response.data;
                this.activateAppSuccess = true;
                this.updateData();
                console.log(this.activateAppmsg);
            });
        },
        async deActivateApp(name) {
           await UserService.deActivateApp(name).then((response) => {
                this.activateAppmsg = response.data;
                this.activateAppSuccess = true;
                this.updateData();
                console.log(this.activateAppmsg);
            });
        },
        async updateData() {
           await UserService.getApp().then((response) => {
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

        await UserService.getConfig().then((response) => {
            this.getconfig = response.data;
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
        async configPort(id, port, name) {
            await UserService.portConfig(id, port.toString(), name).then((response) => {
                this.portconfigmsg = response.data;
                this.updateData();
            });
        },
        async delPort(id) {
            await UserService.deletePort(id).then((response) => {
                this.portconfigmsg = response.data;
                this.updateData();
            });
        }
    }
}
</script>