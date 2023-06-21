<template>
    <div>
  
  
      <div class="card">
        <div class="card-body">
          <h5 style="text-align: center;" class="font-weight-bolder">Checklist Archive</h5>
          <div>
            <q-input to="/Sopupload" rounded outlined type="text" v-model="searchQuery" placeholder="Search folders..." style="width: 600px; text-align: center;"></q-input>
          </div>
          <div v-if="!selectedFolder">
            <table>
              <thead>
                <tr>
                  <th>Folder Name</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="folder in filteredFolders" :key="folder.id"  @click="openFolder(folder)"  > <!-- @click="selectFolder(folder)" -->
                  <td><i class="fa fa-folder"></i> {{ folder.name }}</td>
                  <td>{{ folder.password }} </td>
                  <td>
                    <q-btn style="margin: 10px;" color="primary" icon="edit" label="Edit" size="xs" @click.stop="editFolder(folder)" />
                    <q-btn  style="margin: 10px;"   color="negative" icon="delete" label="Delete" size="xs" @click.stop="deleteFolder(folder)" />
  
                  </td>
                </tr>
                <br>
              </tbody>
            </table>
  
  
    <!-- Add the  Password dialog -->
    <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div   class="text-h6">Enter password</div>
          </q-card-section>
          <q-card-section>
            <q-input v-model="password" type="password" label="Password"></q-input>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Cancel" @click="cancelPrompt"></q-btn>
            <q-btn label="OK" @click="submitPassword(folder)"></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
  
  
  
  
  
  
  
  
  
  
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
            <q-btn class="mt-3" color="primary" label="Back" @click="selectedFolder = null" />
            <table>
              <thead>
                <tr>
                  <th>File Type</th>
                  <th>File Name</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
    <template v-for="(file) in selectedFolder.files">
      <tr  v-for="(f, fIndex) in file" :key="fIndex">
        <img style="width:20px; height:20px;" ref="img" src="../assets/pdf.png"  />
        <td>{{ f.sop_title }}</td>
        <td class="text-right">
          <q-btn style="padding-right: 20px;" color="primary" icon="edit" label="Edit" size="sm" @click.stop="editFile(file)" />
          <q-btn color="negative" icon="delete" label="Delete" size="sm" @click.stop="deleteFile(file)" />
          <div>
  
            <!-- acknowledgement dialog -->
      <q-btn label="Download" color="primary" @click="showDialog = true" />
  
  
  
  
      <div>
      
    </div>
    </div>
  
    <!-- Download Button -->
         <!--  <a :href="'https://cara-sop.s3.ap-southeast-1.amazonaws.com/pdfs/' + f.sop_file" download>
            <q-btn style="padding-right: 20px;" color="primary" icon="cloud_download" label="Download" size="sm" />
          </a> -->
        </td>
      </tr>
    </template>
  </tbody>
  
  
  
  
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
/* import axios from 'axios'; */

export default {
  data() {
    return {
      folders: [],
      selectedFolder: null,
      searchQuery: '',
      showDialog: false,
      selectedOption: '',
      selectedOption2: '',
      prompt: false,
      password: '',
      promptfolder: ''
    };
  },
  created() {
    this.createDefaultFolder();
    try {
    const storedData = localStorage.getItem('remarksData');
    const remarksData = storedData ? JSON.parse(storedData) : {};
    
    this.folders = [
      {
        id: 1,
        name: 'Security',
        path: [],
        files: [
          {
            sop_title: 'Checklist',
            remarksData
          }
        ]
      }
    ];
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

    createDefaultFolder() {
      const defaultFolder = {
        id: 1,
        name: 'Security',
        password: '', // Set the desired password here
        path: [],
        files: [],
        remarksData: JSON.parse(localStorage.getItem('remarksData') || '{}'),
      };

      this.folders.push(defaultFolder);
    },
    openFolder(folder) {
    this.selectedFolder = folder;
  },
  goToFolder(index) {
    this.selectedFolder = this.selectedFolder.path.slice(0, index + 1);
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
  
  tr:hover {
    background-color: #f5f5f5;
  }
  
  </style>
  
  
  