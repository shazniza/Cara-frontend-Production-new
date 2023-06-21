<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h5 style="text-align: center;" class="font-weight-bolder">SOP library Folders</h5>
        <div>
          <q-input rounded outlined type="text" v-model="searchQuery" placeholder="Search folders..." style="width: 600px; text-align: center;"></q-input>
        </div>
        <div v-if="!selectedFolder">
          <table>
            <thead>
              <tr>
                <th>Folder Name</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="folder in filteredFolders" :key="folder.id" @click="selectFolder(folder)">
                <td><i class="fa fa-folder"></i> {{ folder.name }}</td>
                <td>{{ folder.size }} KB</td>
                <td>
                  <q-btn style="margin: 10px;" color="primary" icon="edit" label="Edit" size="xs" @click.stop="editFolder(folder)" />
                  <q-btn  style="margin: 10px;"   color="negative" icon="delete" label="Delete" size="xs" @click.stop="deleteFolder(folder)" />

                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div class="breadcrumb">
            <a @click="selectedFolder = null" :key="'home'">Home</a>
            <span>&nbsp;/&nbsp;</span>
            <template v-for="(folderName, index)  in selectedFolder.path" :key="folderName">
              <a @click="goToFolder(index)" >{{ folderName }}</a>
              <span v-if="index < selectedFolder.path.length - 1">&nbsp;/&nbsp;</span>
            </template>
          </div>
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(file) in selectedFolder.files">
  <tr v-for="(f, fIndex) in file" :key="fIndex">
    <td>{{ f.sop_title }}</td>
    <td class="text-right">
      <q-btn style="padding-right: 20px;" color="primary" icon="edit" label="Edit" size="xs" @click.stop="editFile(f.id)" />
      <q-btn color="negative" icon="delete" label="Delete" size="xs" @click.stop="deleteFile(file)" />
      <a :href="'https://cara-sop.s3.ap-southeast-1.amazonaws.com/pdfs/' + f.sop_file" download>
        <q-btn  style="padding-right: 20px;" color="primary" icon="cloud_download" label="Download" size="xs" />
      </a>
      <q-btn color="amber" glossy label="Approve" />
      <q-btn color="black" label="Review" />
    </td>
  </tr>
</template>

</tbody>




          </table>
          <q-btn class="mt-3" color="primary" label="Back" @click="selectedFolder = null" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      folders: [],
      selectedFolder: null,
      searchQuery: '',
    };
  },
  async mounted() {
    try {
      const response = await axios.get('https://api.caramyaeon.com.my/api/v1/folders');
      const folders = [];

      console.log(response.data); // log the response data

      for (const folder of response.data.data) {
        const folderObj = {
          id: folder.id,
          name: folder.title,
          size: Math.ceil(folder.id / 1024),
          path: [],
          files: [],
        };

        folders.push(folderObj);

        console.log(folder.title); // log the folder title
      }

      this.folders = folders;
    } catch (error) {
      console.error(error);
    }
  },

  computed: {
    filteredFolders() {
      return this.folders.filter(folder => {
        return folder.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    breadcrumbs() {
      if (this.selectedFolder) {
        const breadcrumbs = [];

        let folder = this.selectedFolder;

        while (folder) {
          breadcrumbs.unshift(folder);
          folder = folder.parent;
        }

        return breadcrumbs;
      }

      return [];
    },
  },
  methods: {
    selectFolder(folder) {
  this.selectedFolder = folder;
  if (folder.id) {
    fetch(`https://api.caramyaeon.com.my/api/v1/folders/${folder.id}`)
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data); // log the API response
        console.log('Fetched file data:', data);
        this.selectedFolder.files = data; // set the files property of selectedFolder to the fetched data
        console.log('selectedFolder.files:', this.selectedFolder.files); // log the value of selectedFolder.files
      })
      .catch(error => {
        console.error('Error fetching file data:', error);
      });
  }
},



    editFolder(folder) {
      // handle edit folder logic here
      console.log(folder);
    },
    deleteFolder(folder) {
      // handle delete folder logic here
      console.log(folder);
    },
    editFile(id) {
      console.log('the is the id', id)
  this.$router.push({ path: `/generatesop/${id}` });
},
    goBack() {
      if (this.selectedFolder && this.selectedFolder.parent) {
        this.selectedFolder = this.selectedFolder.parent;
      } else {
        this.selectedFolder = null;
      }
    },
  },
};

</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.table-container {
  display: table;
  width: 200%;
}

.table-row {
  display: table-row;
}

.table-cell {
  display: table-cell;
  vertical-align: middle;
  padding: 10px;
}

.icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background-image: url("https://image.flaticon.com/icons/png/512/69/69524.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.breadcrumb {
  margin-bottom: 20px;
}

.breadcrumb a {
  color: #007aff;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.folder {
  cursor: pointer;
}

.folder::before {
  content: "";
  display: inline-block;
  width: 40px;
}
table {
  width: 100%;
}
</style>
