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
    <h2 class="accordion-header" id="panelsStayOpen-headingFour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
        Hosts
      </button>
    </h2>
    <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
      <div class="accordion-body">
        <div class="table-responsive mt-3">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">Host ID</th>
                    <th scope="col">Mac</th>
                    <th scope="col">IP Address</th>
                    <th scope="col">Location</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(itemHost, indexHost) in getHosts" :key="indexHost">
                    <td scope="col">
                        {{ itemHost.id }}
                    </td>
                    <td scope="col">
                        {{ itemHost.mac }}
                    </td>
                    <td scope="col">
                        <p v-for="(itemIp, indexIp) in itemHost.ipAddresses" :key="indexIp">
                            {{ itemIp }}
                        </p>
                    </td>
                     <td scope="col">
                        <p v-for="(itemLocation, indexLoc) in itemHost.locations" :key="indexLoc">
                            {{ itemLocation.elementId + "/" + itemLocation.port }}
                        </p>
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

            <button type="button" class="btn btn-primary" @click="configPort(selected.id, portnum, portname)">Submit Config</button>
        </div>
        </div>
        </div>
        <div class="table-responsive mt-3">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">Device</th>
                    <th scope="col">Port</th>
                    <th scope="col">Port Name</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(itemport, index2) in getconfig.ports" :key="index2">
                    <td scope="col">
                        {{ index2.split("/")[0] }}
                    </td>
                    <td scope="col">
                        {{ index2.split("/")[1] }}
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

  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
        VPLS Configuration
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
      <div class="accordion-body">
        <div class="container text-center">
            <div class="row mb-3">
            
        <div class="col">
            <strong>Assign a VPLS Name:</strong>
            <div class="input-group mb-3 mt-3">
                <input type="text" v-model="vplsname" min="1" class="form-control" placeholder="Port Name">
            </div>
            <button type="button" class="btn btn-primary" @click="configVpls(vplsname)">Submit VPLS Name</button>
        </div>
        
        </div>
        <div class="row">
            <div class="col">
                    <strong>Choose VPLS:</strong>
                    <select required
                        v-model="selectedVpls"
                        class="form-select mb-3 mt-3"
                        aria-label="Select a device"
                        placeholder="Choose a Device">
                    
                    <option
                        v-for="(vplsList, indexVplsList) in getVpls.vplss"
                        v-bind:value="vplsList.name"
                        :key="indexVplsList">
                        {{ vplsList.name }}
                    </option>
                    </select>
                </div>
            <div class="col">
                    <strong>Choose Device:</strong>
                    <select required
                        v-model="selected2"
                        class="form-select mb-3 mt-3"
                        aria-label="Select a device"
                        placeholder="Choose a Device">
                    
                    <option
                        v-for="(devicevpls, indexDeviceVpls) in devices.devices"
                        v-bind:value="{ id: devicevpls.id}"
                        :key="indexDeviceVpls">
                        {{ devicevpls.id }}
                    </option>
                    </select>
                </div>
                <div class="col">
                   <strong>Choose Port:</strong>
                    <div class="input-group mb-3 mt-3">
                    <input type="number" v-model="portNumVpls" min="1" class="form-control" placeholder="Choose Port">
                </div>
            </div>
            <div class="col">
            <strong>Port Name:</strong>
            <div class="input-group mb-3 mt-3">
                <input type="text" v-model="portNameVpls" min="1" class="form-control" placeholder="Port Name">
            </div>

            <button type="button" class="btn btn-primary" @click="configPortVpls(selectedVpls, selected2.id, portNumVpls, portNameVpls)">Submit VPLS Port</button>
        </div>
        </div>
        </div>
        
        <div class="table-responsive mt-3">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">VPLS Name</th>
                    <th scope="col">Asscociated Port Name</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(vplsitem, indexvplsitem) in getVpls.vplss" :key="indexvplsitem">
                    <td scope="col">
                        {{ vplsitem.name }}
                    </td>
                    <td scope="col">
                       <p v-for="(vplsInterface, indexVplsInterface) in vplsitem.interfaces" :key="indexVplsInterface">
                        {{ vplsInterface.name }}
                    </p> 
                    </td>
                     <td scope="col">
                        <button type="button" class="btn btn-danger" @click="delVpls(vplsitem.name)">Delete</button>
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
            selected2: [],
            portname: "",
            vplsname: "",
            vplsConfigmsg:"",
            activateAppmsg: "",
            activateAppSuccess: false,
            portnum: "",
            portconfigmsg: "",
            getconfig:"",
            getVpls:"",
            vplsPortConfigmsg:"",
            portNumVpls:"",
            portNameVpls:"",
            selectedVpls:"",
            getHosts:""
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

        UserService.getVplsList().then((response) => {
            this.getVpls = response.data;
        },
        (error) => {
            this.content = 
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message || 
                error.toString();
        });

        UserService.getHostList().then((response) => {
            let temp = response.data;
            this.getHosts = temp.hosts;
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
            UserService.getApp().then((response) => {
            this.content = response.data;
            this.updateDevice();
            this.updateConfig();
            this.getVplsList();
            this.getHostsList();
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
        updateConfig() {
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
        updateDevice() {
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
        configPort(id, port, name) {
            UserService.portConfig(id, port.toString(), name).then((response) => {
                this.portconfigmsg = response.data;
                this.updateData();
            });
        },
        delPort(id) {
            UserService.deletePort(id).then((response) => {
                this.portconfigmsg = response.data;
                this.updateData();
            });
        },
        configVpls(name) {
            UserService.vplsConfig(name).then((response) => {
                this.vplsConfigmsg = response.data;
                this.updateData();
                console.log(this.vplsConfigmsg)
            });
        },
        configPortVpls(vplsName, portDevice, portNum, portName) {           
            UserService.vplsConfigPort(vplsName, portDevice, portNum, portName).then((response) => {
               this.vplsPortConfigmsg = response.data;
               this.updateData();
               console.log(this.vplsPortConfigmsg)
           });
        },
        getVplsList() {
            UserService.getVplsList().then((response) => {
            this.getVpls = response.data;
        });
        },
        delVpls(vplsName) {
            UserService.delVpls(vplsName).then((response) => {
            this.vplsConfigmsg = response.data;
            this.updateData()
            console.log(this.vplsConfigmsg);
        });
        },
        getHostsList() {
            UserService.getHostList().then((response) => {
                let temp = response.data;
            this.getHosts = temp.hosts;
        });
        }
    }
}
</script>