<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <!-- Navbar code goes here -->
      </div>
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">Role Management</h5>
              <button type="button" class="btn btn-primary" @click="showModal = true">Add Role</button>
            </div>
            <div class="table-responsive">
              <table class="table table-hover mt-4">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Permissions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="role in roles" :key="role.id">
                    <td>{{ role.name }}</td>
                    <td>
                      <ul>
                        <li v-for="permission in role.permissions" :key="permission.id">{{ permission.name }}</li>
                      </ul>
                    </td>
                    <td>
                      <button class="btn btn-danger btn-sm" @click="deleteRole(role.id)"><i class="fas fa-trash"></i></button>
                      <button class="btn btn-primary btn-sm" @click="editRole(role.id)"><i class="fas fa-edit"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Add-dialog v-if="showModal" @close="showModal = false"></Add-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import AddDialog from '../../src/views/components/AddDialog.vue';

export default {
  components: {
    AddDialog,
  },
  data() {
    return {
      roles: [],
      showModal: false,
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    getRoles() {
      axios.get('https://api.caramyaeon.com.my/api/roles')
        .then(response => {
          this.roles = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteRole(roleId) {
      axios.delete(`https://api.caramyaeon.com.my/api/roles/${roleId}`)
        .then(response => {
          this.getRoles();
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    },
    editRole(roleId) {
      console.log(roleId)
      // logic to edit a role
    },
  },
};
</script>