<template>
  <div>


    <div class="card">
      <div class="card-body">
        <q-btn to="/Sopupload" color="primary" label="Upload Sop" icon="cloud_upload" />
        <h5 style="text-align: center;" class="font-weight-bolder">SOP Archive Folders</h5>
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

<q-dialog v-model="showDialog">
  <q-card>
    <q-toolbar>
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
      </q-avatar>

      <q-toolbar-title><span class="text-weight-bold">Acknowledgement <br>
Pengakuan</span></q-toolbar-title>

      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-card-section>
      I hereby acknowledge that I am going to view and download the following documents from CARA (caramyaeon.com.my).
      Saya dengan ini mengakui bahawa saya akan melihat dan memuat turun dokumen berikut daripada CARA (caramyaeon.com.my).

      I acknowledge the it is my responsbility to read, understand, and adhere to these procedures.
      Saya mengakui tanggungjawab saya untuk membaca, memahami dan mematuhi prosedur ini.

      Any unauthorized use, disclosure, copying, distribution, or action related to the content of this SOP is strictly prohibited and may be illegal. I also understand that failure to follow the SOP may result in disciplinary action, including termination.
      Sebarang penggunaan, pendedahan, penyalinan, pengedaran, atau tindakan yang tidak dibenarkan yang berkaitan dengan kandungan SOP ini adalah dilarang sama sekali dan mungkin menyalahi undang-undang. Saya juga faham bahawa kegagalan mematuhi SOP boleh mengakibatkan tindakan tatatertib, termasuk pemberhentian.

      <div class="text-h6">Radio Button Options:</div>
      <q-item>
  <q-item-section>
    <q-radio v-model="selectedOption" val="Agree"  />
  </q-item-section>
  <q-item-section>Agree</q-item-section>
</q-item>
<q-item>
  <q-item-section>
    <q-radio v-model="selectedOption" val="Disagree"  />
  </q-item-section>
  <q-item-section>Disagree</q-item-section>
</q-item>


      <div v-if="selectedOption === 'Disagree'">
        In case of any disagreement or discrepancy in the procedures, it is within my responsibility to provide feedback to the Process Owner.
Sekiranya terdapat sebarang percanggahan atau percanggahan dalam prosedur, adalah menjadi tanggungjawab saya untuk memberikan maklum balas kepada Pemilik Proses.


<q-item>
  <q-item-section>
    <q-radio v-model="selectedOption2" val="Agree"  />
  </q-item-section>
  <q-item-section>Agree</q-item-section>
</q-item>
<q-item>
  <q-item-section>
    <q-radio v-model="selectedOption2" val="Disagree"  />
  </q-item-section>
  <q-item-section>Disagree</q-item-section>
</q-item>

      </div>
      <div v-if="selectedOption2 === 'Agree'">

        <a :href="'https://cara-sop.s3.ap-southeast-1.amazonaws.com/pdfs/' + f.sop_file" download>
          <q-btn style="padding-right: 20px;" color="primary" icon="cloud_download" label="Download" size="sm" />
        </a>
        </div>
    </q-card-section>

  </q-card>
</q-dialog>


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
import axios from 'axios';

export default {
  data() {
    return {
      folders: [],
      selectedFolder: null,
      searchQuery: '',
      showDialog: false,
      selectedOption: '',
      selectedOption2:'',
      prompt: false,
      password: '',
      promptfolder:''
    };
  },
  async mounted() {
    try {
      const response = await axios.get('https://api.caramyaeon.com.my/api/archivefolders');
      const folders = [];

      console.log(response.data); // log the response data

      for (const folder of response.data.archive_folders) {
        const folderObj = {
          id: folder.id,
          name: folder.title,
          password: folder.password,
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
    openFolder(folder) {

      this.promptfolder = folder
      // Check if the user is authorized to access the folder
      console.log(folder.password)
      if(folder.password == null){
        this.selectFolder(folder)
      }
      else{
        this.prompt = true;
      }
      /*  */
      // If the user is not authorized, show the prompt
    },
    submitPassword() {
      // Check if the user is authorized to access the folder
      if(this.password == this.promptfolder.password){
        this.selectFolder(this.promptfolder)
      }
      else{
        alert('wrong password')
      }

      // If the user is authorized, navigate to the folder

      // Reset the password and close the dialog
      this.password = '';
      this.prompt = false;
    },
    cancelPrompt() {
      // Reset the password and close the dialog
      this.password = '';
      this.prompt = false;
    },
    selectFolder(folder) {
  this.selectedFolder = folder;
  if (folder.id) {
    fetch(`https://api.caramyaeon.com.my/api/archivefolders/${folder.id}`)
      .then(response => response.json())
      .then(data => {
        // handle the fetched file data here
        console.log('this is the files', this.files)
        console.log(data);
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

tr:hover {
  background-color: #f5f5f5;
}

</style>


