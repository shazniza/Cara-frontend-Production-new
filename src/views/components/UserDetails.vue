<template>
    <div class="q-pa-md">
      <q-card class="user-details-card">
        <q-card-section>
          <div class="q-mb-md">
            <h2 class="text-h5">{{ user.name }}</h2>
          </div>
          <hr class="my-4" />
          <q-item>
            <q-item-label header style="width: 60px;">ID:</q-item-label>
            <q-item-section>
              <q-item-label>{{ user.user_id }}</q-item-label>
            </q-item-section>
          </q-item>

        <h5>Select Role</h5>
          <q-select
          placeholder="Select a role"       
  v-model="selectedRole"
  :options="roles"
  fill-input
  style="width: 300px ; margin-left: 10px;"
/>
  
          <q-item>
            <q-item-section>
                <q-input
            filled
            label="Business_unit"
            v-model="business"
            class="mb-3"
          />
            </q-item-section>
          </q-item>
  
       
  
          <q-item>
            <q-item-section>
                <q-input
            filled
            label="Password"
            v-model="password"
            class="mb-3"
          />
            </q-item-section>
          </q-item>
          <h5>{{ typeof this.selectedRole }}</h5>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn class="q-mr-md" color="primary" label="Update" @click="updateUser" />
          <q-btn color="secondary" label="Back to Users" @click="$router.push('/userTables')" />
        </q-card-actions>
      </q-card>
    </div>
  </template>
  
  <script>
  import axios from 'axios'


  
  export default {
    name: 'UserDetails',
    data() {
      return {
        user: {},
        password: '',
        roles: ['admin','user', 'Approver' ,'Reviewer'],
        selectedRole: null,
        loading: true,
        business: ""
      };
    },
    async created() {
        try {
    const response = await fetch(
      `http://api.caramyaeon.com.my/api/users/${this.$route.params.id}`
    );
    this.user = await response.json();
    this.business = this.user.business_unit
    this.loading = false;
  } catch (error) {
    console.error(error);
  }
      
    },

    methods: {
      async updateUser() {
     
        const url = 'http://api.caramyaeon.com.my/api/user_update'
        console.log(this.selectedRole)

const payload = {
  name: this.user.name,
  user_id: this.user.user_id,
  password: this.password,
  password_confirmation: this.password,
  business_unit: this.user.business_unit,
  roles: this.selectedRole.toString()
}

try {
  const response = await axios.put(url, payload)
  console.log(response.data) // log the updated user object to the console
  this.$q.notify({
  message: 'Updated Succcesfully',
  color: 'positive',
  position: 'top',
  style: { width: '1500px' },
  timeout: 1000,
  actions: [{ icon: 'close', color: 'white' }],
  
});
} catch (error) {
  console.error(error)
}











        }
      },
   
  };
  </script>
  
  <style scoped>
  .user-details-card {
    max-width: 800px;
    margin: 0 auto;
    padding: 32px;
  }
  
  .text-h5 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 16px;
  }
  </style>
  