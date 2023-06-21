<template>
  <q-card>
    <q-card-section>
      <div>
        <div class="field">
          <label class="label">Filter:</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Search users" v-model="filterText" @keyup="search()" />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button" @click="search()">Search</button>
            </div>
          </div>
        </div>

        <div class="buttons">
          <q-btn class="glossy" label="Users" rounded color="deep-orange" @click="filterByRole('user')"></q-btn>
          <q-btn class="glossy" label="Approver" rounded color="deep-orange" @click="filterByRole('approver')"></q-btn>
          <q-btn class="glossy" label="Reviewer" rounded color="deep-orange" @click="filterByRole('reviewer')"></q-btn>
        </div>

        <q-skeleton v-if="loading" :loading="loading" tag="table" class="table is-fullwidth is-striped" size="100" />

        <table v-else class="table is-fullwidth is-striped" style="max-width: 100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Business Unit</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(author, index) in filteredAuthors" :key="index" @click="goToUserDetails(author)" class="clickable-row">
              <td>{{ author.id }}</td>
              <td>{{ author.name }}</td>
              <td>{{ author.business_unit }}</td>
              <td>{{ author.role }}</td>
              <td>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </q-card-section>
  </q-card>
</template>


<script>
import axios from "axios";

export default {
  name: "authors-table",
  data() {
    return {
      filterText: "",
      authors: [],
      loading: true,
      page: 1,
      limit: 20,
    };
  },
  computed: {
    filteredAuthors() {
      let filtered = this.authors;
      filtered = filtered.filter(author =>
        author.name.toLowerCase().includes(this.filterText.toLowerCase())
      );
      return filtered;
    },
  },
  methods: {
    loadMore() {
      this.page++;
      this.getUsers();
    },
    filterByRoleOnly() {
  let filtered = this.authors;
  filtered = filtered.filter(author =>
    author.role.toLowerCase().includes(this.filterText.toLowerCase())
  );
  this.filteredAuthorsList = filtered;
},
    getUsers() {
      axios
        .get("https://api.caramyaeon.com.my/api/users", {
          params: {
            page: this.page,
            limit: this.limit,
          },
        })
        .then((response) => {
          console.log(response.data); // add this line to see the response in console
          this.authors = [];
          console.log(response.data)
          response.data.forEach((user) => {
            this.authors.push({
              id: user.user_id,
              name: user.name,
              business_unit: user.business_unit,
              role: user.role,
              status: user.status,
              avatar: "../../assets/aeon.png",
            });
          });

          this.loading = false;
        });
    },
    filterByRole(role) {
  this.filterText = role;
  this.filterByRoleOnly();
},
    search() {
      this.page = 1;
      this.getUsers();
    },
    goToUserDetails(author) {
      // Navigate to user details page with the author's ID
      this.$router.push({ name: 'user-details', params: { id: author.id }});
    },
  },
  mounted() {
    this.getUsers();
    axios.interceptors.response.use(
      (response) => {
        if (response.data.length >= this.limit) {
          this.$nextTick(() => {
            this.$refs.loadMore.disabled = false;
          });
        } else {
          this.$nextTick(() => {
            this.$refs.loadMore.disabled = true;
          });
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
};
</script>

<style>
.clickable-row {
  cursor: pointer;
}
.clickable-row:hover {
  background-color: #f5f5f5;
}
</style>
