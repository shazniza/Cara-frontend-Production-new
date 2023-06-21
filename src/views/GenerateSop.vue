
<template>
  <div>
    <div class="card">
    <div class="card-body">

      <div style="display: flex; justify-content: center;">
  <img style="width:260px; height:100px;" ref="img" src="../assets/aeon.png"  />
</div>


<div style="display: flex; flex-direction: column; align-items: center; margin-top: 20px; padding-top: 20px;">
<label for="my-input">Created by</label>
<input type="text" v-model="Sop.uploaded_by" name="name" disabled>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
  <label for="sop-title" style="font-size: 18px; margin-bottom: 10px;">SOP Title:</label>
  <q-input rounded outlined v-model="Sop.sopTitle" style="width: 800px;" @blur="saveToLocalStorage('sopTitle', Sop.sopTitle)"></q-input>

</div>

<div style="display: flex; flex-direction: column; align-items: center;">
  <label for="sop-title" style="font-size: 18px; margin-bottom: 10px;">Version No.:</label>
  <q-input rounded outlined v-model="Sop.versionNo" @blur="saveToLocalStorage('versionNo', Sop.versionNo)" style="width: 800px;"></q-input>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
  <label for="sop-title" style="font-size: 18px; margin-bottom: 10px;">Business Unit:</label>
  <q-input rounded outlined v-model="Sop.businessUnit"  @blur="saveToLocalStorage('businessUnit', Sop.Sop.businessUnit)" style="width: 800px;"></q-input>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
  <label for="sop-title" style="font-size: 18px; margin-bottom: 10px;">Effective Date:</label>
  <q-input rounded outlined v-model="Sop.effectiveDate" @blur="saveToCache('effectiveDate')" style="width: 800px;"></q-input>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
  <label for="sop-title" style="font-size: 18px; margin-bottom: 10px;">Process Owner:</label>
  <q-input rounded outlined  v-model="Sop.processOwner" @blur="saveToCache('processOwner')" style="width: 800px;"></q-input>
</div>


<div>
  <label for="process-execution" style="font-size: 18px; margin-bottom: 10px;">Process Execution:</label>
  <!-- Editor Here -->
  <div style="display: flex; justify-content: center;">
  <div style="width: 900px;">
    <q-editor
    v-model="Sop.processExecution"
      flat
      content-class="bg-amber-3"
      toolbar-text-color="white"
      toolbar-toggle-color="white"
      toolbar-bg="primary"
      class="q-editor-custom"
      :toolbar="[
        ['bold', 'italic', 'underline'],
        [{
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
        }]
      ]"
    />
  </div>
</div>



</div>

<label for="policy" style="font-size: 18px; margin-bottom: 10px;">Policy:</label>
<!-- Editor Here -->
<div style="display: flex; justify-content: center;">
  <div style="width: 900px;">
    <q-editor
    v-model="Sop.policy"
      flat
      content-class="bg-amber-3"
      toolbar-text-color="white"
      toolbar-toggle-color="white"
      toolbar-bg="primary"
      class="q-editor-custom"
      :toolbar="[
        ['bold', 'italic', 'underline'],
        [{
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
        }]
      ]"
    />
  </div>
</div>
<div>

  <label for="polisi" style="font-size: 18px; margin-bottom: 10px;">Polisi</label>
<!-- Editor Here -->
<div style="display: flex; justify-content: center;">
  <div style="width: 900px;">
    <q-editor
    v-model="Sop.Malaypolicy"
      flat
      content-class="bg-amber-3"
      toolbar-text-color="white"
      toolbar-toggle-color="white"
      toolbar-bg="primary"
      class="q-editor-custom"
      :toolbar="[
        ['bold', 'italic', 'underline'],
        [{
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
        }]
      ]"
    />
  </div>
</div>




  
  <label for="purpose-scope" style="font-size: 18px; margin-bottom: 10px;">Purpose and Scope:</label>

  <!-- Editor Here -->
  <div style="display: flex; justify-content: center;">
  <div style="width: 900px;">
    <q-editor
    v-model="Sop.purposeScope"
      flat
      content-class="bg-amber-3"
      toolbar-text-color="white"
      toolbar-toggle-color="white"
      toolbar-bg="primary"
      class="q-editor-custom"
      :content-style="{ color: '#1f1f1f' }"
      :toolbar="[
        ['bold', 'italic', 'underline'],
        [{
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
        }]
      ]"
    />
  </div>
</div>

</div>


<label for="purpose-scope" style="font-size: 18px; margin-bottom: 10px;">Tujuan dan Skop:</label>

  <!-- Editor Here -->
  <div style="display: flex; justify-content: center;">
  <div style="width: 900px;">
    <q-editor
    v-model="Sop.MalaypurposeScope"
      flat
      content-class="bg-amber-3"
      toolbar-text-color="white"
      toolbar-toggle-color="white"
      toolbar-bg="primary"
      class="q-editor-custom"
      :content-style="{ color: '#1f1f1f' }"
      :toolbar="[
        ['bold', 'italic', 'underline'],
        [{
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
        }]
      ]"
    />
  </div>
</div>

<div>
  <label  style="font-size: 18px; margin-bottom: 10px;">Review, Monitoring and Update:</label>
  

  <!-- Editor Here -->
  <div style="display: flex; justify-content: center;">
  <div style="width: 900px;">
    <q-editor
      v-model="Sop.monitoring"
      flat
      content-class="bg-amber-3"
      toolbar-text-color="white"
      toolbar-toggle-color="blue-grey-13"
      toolbar-bg="primary"
      class="q-editor-custom"
      :toolbar="[
        ['bold', 'italic', 'underline'],
        [{
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
        }]
      ]"
    />
  </div>
</div>




<label  style="font-size: 18px; margin-bottom: 10px;">Semakan, Pemantauan dan Kemas Kini::</label>
  

  <!-- Editor Here -->
  <div style="display: flex; justify-content: center;">
  <div style="width: 900px;">
    <q-editor
      v-model="Sop.Malaymonitoring"
      flat
      content-class="bg-amber-3"
      toolbar-text-color="white"
      toolbar-toggle-color="blue-grey-13"
      toolbar-bg="primary"
      class="q-editor-custom"
      :toolbar="[
        ['bold', 'italic', 'underline'],
        [{
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
        }]
      ]"
    />
  </div>
</div>



<div class="text-center" style="justify-content: center;">
    <div v-for="(item, index) in Sop.items" :key="index">
      <div class="q-mb-md">
        <label> Procedure {{ index + 1 }}</label>
        <q-input
          filled
          v-model="Sop.procedures[index]"
          label="Procedure"
          @blur="onProcedureBlur(index)"
        />
        <label> Description {{ index + 1 }}</label>
        <q-input
          filled
          v-model="Sop.descriptions[index]"
          label="Description"
          @blur="onDescriptionBlur(index)"
        />
        <label> Appendix  {{ index + 1 }}</label>
        <q-uploader
          ref="myUploaders"
          class="q-mt-md uploader"
          :url="url"
          :headers="headers"
          :field-name="fieldName"
          :multiple="true"
          @added="onUploadAdded(index, $event)"
          @removed="onUploadRemoved(index, $event)"
        />
        <q-btn class="q-mt-md" label="Remove Item" @click="removeItem(index)" />
      </div>
    </div>
    <q-btn class="q-mt-md" label="Add Procedure" @click="addItem" size="lg" dense font-weight="bold" />

</div>





<!-- <flowchart></flowchart> -->





  </div>
  </div>

    

<!-- Status -->
<label  style="font-size: 18px; margin-bottom: 10px;">Status:</label>
    
    <div class="text-center">
  <select id="status" v-model="selectedStatus" disabled class="custom-select">
    <option value="in-progress">In-Progress</option>
    <option value="approved">Approved SOP</option>
    <option value="reviewed">Reviewed SOP</option>
  </select>
</div>

  



    
      <!-- Assigned Reviweers -->

<label  for="Assigned Reviweers" style="font-size: 18px; margin-bottom: 10px;"> Reviweers:</label>


<div>
    <div>
      <!-- The Search Bar -->
      <div style="display: flex; justify-content: center;">
  <q-input placeholder="Search for users..." rounded outlined v-model="searchTerm" style="width: 800px;"></q-input>
</div>

    </div>
    <!-- The list container -->
    <div class="user-list-container">
  <ul>
    <li v-for="user in filteredUsers" :key="user.id">
      <label>
        <input type="checkbox" :value="user" v-model="selectedUsers">
        {{ user.name }}
      </label>
    </li>
  </ul>
</div>


 <!-- Assigned Reviewers -->
 <label for="Assigned Reviweers" style="font-size: 18px; margin-bottom: 10px;">Assigned Reviewers:</label>
 <div class="selected-users-wrapper">
  <div class="selected-users">
  
      <q-item-section class="selected-users" v-for="user in selectedUsers" :key="user.id">
        <q-badge rounded color="orange" :label="user.name">
          <q-btn flat dense round icon="close" color="negative" @click="removeUser(user)" />
        </q-badge>
      </q-item-section>




  </div>
</div>
  </div>




  <Chart></Chart>



  <q-card>
<!-- Assigned Approvers -->
<label for="Assigned Approvers" style="font-size: 18px; margin-bottom: 10px;">Approvers:</label>

<div>
  <div style="display: flex; justify-content: center;">
    <!-- The Search Bar -->
    <q-input placeholder="Search for approvers..." rounded outlined v-model="searchapprover" style="width: 800px;"></q-input>
  </div>

  <!-- The list container -->
  <div class="user-list-container">
    <ul>
      <li v-for="approver in filteredApprovers" :key="approver.id">
        <label>
          <input type="checkbox" :value="approver" v-model="selectedApprovers">
          {{ approver.name }}
        </label>
      </li>
    </ul>
  </div>

  <!-- The Selected Approvers -->
  <label for="Assigned Approvers" style="font-size: 18px; margin-bottom: 10px;"> Assigned Approvers:</label>
  <div class="selected-users-wrapper">
  <div class="selected-users">
      <q-item-section class="selected-approvers" v-for="approver in selectedApprovers" :key="approver.id">
        <q-badge rounded color="green" :label="approver.name">
          <q-btn flat dense round icon="close" color="negative" @click="removeApprover(approver)" />
        </q-badge>
      </q-item-section>
    </div>
  </div>
</div>

<label  style="font-size: 18px; margin-bottom: 10px;">Folder:</label>
    
<div class="text-center">
  <select id="status" v-model="selectedFolder" class="custom-select">
    <option v-for="(folder, index) in folders" :key="index" :value="folder">{{ folder.name }}</option>
  </select>
</div>


{{ this.Sop.images }}


<br><br>
 <!-- Generate PDF button  -->
 <q-card>
 <div style="display: flex; justify-content: center;">
  <q-btn
    color="primary"
    @click="Pdf"
    style="width: 150px"
    label="Generate PDF"
  />
</div>

</q-card>
</q-card>















  </div>



    </div>
    
    <div>
      




    </div>
  </template>
  
  <script>
import axios from 'axios';
import AWS from 'aws-sdk';
import { generatePdf } from  '../Services/Generatesop'
import   Chart from  '../views/components/chart.vue'



/* import Flowchart from '../views/components/flowchart.vue'; */

export default {
  name: "SopGenerator",
  components: {

/*   Flowchart, */
  Chart
  },
  data() {
    return {
      Sop: {
        uploaded_by: localStorage.getItem('name') ?? "",
        sopTitle: localStorage.getItem('sopTitle') ?? "",
        versionNo: localStorage.getItem('versionNo') ?? "",
        businessUnit: localStorage.getItem('businessUnit') ?? "",
        effectiveDate: "",
        processOwner: "",
        processExecution: "",
        policy: "",
        Malaypolicy:"",
        purposeScope: "",
        MalaypurposeScope:"",
        monitoring: "",
        Malaymonitoring:"",
        items: [],
        procedures: [],
        descriptions: [],
        images: [],
        status: "in-progress",
        Reviewers: this.selectedUsers,
        Approvers: this.selectedApprovers
      },
      url: 'http://example.com/upload',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      fieldName: 'file',
      currentItem: 2,
      media: [],
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'David' },
        { id: 5, name: 'Eve' },
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'David' },
        { id: 5, name: 'Eve' },
      ],
      selectedUsers: [],
      searchTerm: '',
      searchapprover:'',
      approvers: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' },
        { id: 4, name: 'Alice Brown' },
        { id: 5, name: 'Charlie Davis' }
      ],
      selectedApprovers: [],
      selectedStatus: 'In-Progress',
      base: [],
      folders:[],
      Selectedfolder:''
    };
   
  },


  beforeRouteEnter(to, from, next) {
  next(vm => {
    // Check if the previous route had an ID parameter
    const hadId = !!from.params.id;

    // Check if the current route has an ID parameter
    const hasId = !!to.params.id;

    // Reset the values if the previous route had an ID parameter
    // and the current route does not have an ID parameter
    if (hadId && !hasId) {
      vm.Sop = {
        uploaded_by: localStorage.getItem('name'),
        sopTitle: localStorage.getItem('sopTitle') ?? "",
        versionNo: localStorage.getItem('versionNo') ?? "",
        businessUnit: localStorage.getItem('businessUnit') ?? "",
        effectiveDate: "",
        processOwner: "",
        processExecution: "",
        policy: "",
        purposeScope: "",
        monitoring: "",
        items: [],
        procedures: [],
        descriptions: [],
        images: [],
        status: "in-progress",
        Reviewers: vm.selectedUsers,
        Approvers: vm.selectedApprovers
      }
      console.log('Values reset successfully');
    }
  });
},

  
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        return user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      })
    },
    filteredApprovers() {
      const searchTerm = this.searchapprover.toLowerCase();
      return this.approvers.filter(approver => approver.name.toLowerCase().includes(searchTerm));
    },
    localStorageName() {
      return localStorage.getItem('name');
    }
  },
  mounted() {
    // Set the default selected value to "In-Progress"
    this.selectedStatus = 'in-progress';
    this.created_at = this.getCurrentDate()
    
  },
  
  created() {
    this.getFolders();
  if (this.$route.params.id) {
    fetch(`https://api.caramyaeon.com.my/api/generatesops/${this.$route.params.id}`)
      .then(response => response.json())
      .then(data => {
        console.log( 'Edit SOP object', data)
        this.Sop.uploaded_by = data.uploaded_by ?? "";
        this.Sop.sopTitle = data.sop_title ?? "";
        this.Sop.versionNo = data.version_no ?? "";
        this.Sop.businessUnit = data.business_unit ?? "";
        this.Sop.effectiveDate = data.effective_date ?? "";
        this.Sop.processOwner = data.Process_owner ?? "";
        this.Sop.processExecution = data.Process_exec ?? "";
        this.Sop.policy = data.policy ?? "";
        this.Sop.Malaypolicy = data.policymal ?? "";
        this.Sop.purposeScope = data.purpose ?? "";
        this.Sop.MalaypurposeScope = data.scopemal ?? "";
        this.Sop.monitoring = data.monitoring ?? "";
        this.Sop.Malaymonitoring = data.monitoringmal ?? "";
        this.Sop.items = data.desc.length?? [];
        this.Sop.procedures = data.steps ?? [];
        this.Sop.descriptions = data.desc ?? [];
        this.Sop.images = data.appendix ?? [];
        this.Sop.status = data.status ?? "";
        this.Sop.Reviewers = data.Reviewers ?? [];
        this.Sop.Approvers = data.Approvers ?? [];
      })
      .catch(error => {
        console.error('Error fetching SOP data:', error);
      });
  } else {
    this.Sop = {
      uploaded_by: localStorage.getItem('name'),
      sopTitle: localStorage.getItem('sopTitle') ?? "",
      versionNo: localStorage.getItem('versionNo') ?? "",
      businessUnit: localStorage.getItem('businessUnit') ?? "",
      effectiveDate: "",
      processOwner: "",
      processExecution: "",
      policy: "",
      purposeScope: "",
      monitoring: "",
      items: [],
      procedures: [],
      descriptions: [],
      images: [],
      status: "in-progress",
      Reviewers: this.selectedUsers,
      Approvers: this.selectedApprovers
    }
  }
},




  beforeUnmount() {
    if (this.Sop.sopTitle && this.Sop.versionNo && this.Sop.businessUnit) {
  // do something if all three values are not empty
  this.$q.notify({
  message: 'Saved in drafts',
  color: 'positive',
  position: 'top',
  style: { width: '1500px' },
  timeout: 1000,
  actions: [{ icon: 'close', color: 'white' }],
  classes: 'glossy'
  
});
} 
    




},
  methods: {
    async  getFolders() {
      try {
      const response = await axios.get('https://api.caramyaeon.com.my/api/v1/folders');
      const folders = [];

      console.log(response.data); // log the response data

      for (const folder of response.data.data) {
        const folderObj = {
          id: folder.id,
          name: folder.title,
        };

        folders.push(folderObj);

        this.folders.push(folder.title)
        console.log( 'these are the title', this.folders); // log the folder title
        
      }

      this.folders = folders;
    } catch (error) {
      console.error(error);
    }
  },


    saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
    console.log(key,value)
  },

    addItem() {
      this.Sop.items.push('');
      this.Sop.procedures.push('');
      this.Sop.descriptions.push('');
      this.Sop.images.push([]);

      console.log(this.procedures)
      console.log(this.descriptions)
      console.log(this.images)
      console.log(this.items)
    },
    removeItem(index) {
      this.Sop.items.splice(index, 1);
      this.Sop.procedures.splice(index, 1);
      this.Sop.descriptions.splice(index, 1);
      this.Sop.images.splice(index, 1);
    },
    onProcedureBlur(index) {
      const procedure = this.Sop.procedures[index].trim();
      if (procedure) {
        this.Sop.procedures.splice(index, 1, procedure);
      }
    },
    onDescriptionBlur(index) {
      const description = this.Sop.descriptions[index].trim();
      if (description) {
        this.Sop.descriptions.splice(index, 1, description);
      }
    },


  // Fucntion To Check for images added in Q uplaoder
  async onUploadAdded(index, $event) {
  const files = $event;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name;
    const s3 = new AWS.S3({
      accessKeyId: 'AKIA2FRS3OVHN5T7YH4P',
      secretAccessKey: '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',
      region: 'ap-southeast-1'
    });
    const params = {
      Bucket: 'cara-sop',
      Key: fileName,
      Body: file,
      ContentType: file.type
    };
    try {
      const uploadResult = await s3.upload(params).promise();
      const fileUrl = uploadResult.Location;
      console.log('File URL:', fileUrl);
      this.Sop.images[index].push(fileUrl);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to upload image');
    }
  }
  console.log('the URLs of images', this.Sop.images);
},


// Fucntion To Check for images Removed in Q uplaoder
async onUploadRemoved(index, file) {
  console.log(`Removing file ${file} from index ${index}`);
  this.Sop.images[index].splice(this.Sop.images[index].indexOf(file), 1);
  console.log('Updated images array:', this.Sop.images);
},




   getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return dateString;
},
    removeApprover(approver) {
      this.selectedApprovers = this.selectedApprovers.filter(a => a.id !== approver.id);
    },
    removeUser(user) {
      const index = this.selectedUsers.findIndex(u => u.id === user.id)
      if (index !== -1) {
        this.selectedUsers.splice(index, 1)
      }},
    filterItems() {
      const filterKey = this.filterKey.toLowerCase();
      this.filteredItems = this.items.filter(item => {
        return Object.values(item).some(value =>
          value.toLowerCase().includes(filterKey)
        );
      })
    },
    showSearchModal() {
      this.searchModal = true
    },
    search() {
      // perform search logic here
      this.searchModal = false
    },
    cancelSearch() {
      this.searchModal = false
      this.searchInput = ''
    },
    changeMedia(media){
        this.media = media
      },
    onFileChange(event, index) {
      this.items[index].file = event.target.files[0];
    },
    submitForm() {
      // Send a POST request to the backend API with the form data
     
  axios.post("https://api.caramyaeon.com.my/api/generatesops", {
  uploaded_by: this.Sop.uploaded_by,
  sop_title: this.Sop.sopTitle,
  version_no: this.Sop.versionNo,
  business_unit: this.Sop.businessUnit,
  effective_date: this.Sop.effectiveDate,
  process_owner: this.Sop.processOwner,
  process_exec: this.Sop.processExecution,
  policy: this.Sop.policy,
  purpose: this.Sop.purposeScope,
  scope: this.Sop.purposeScope,
  review_pro: this.Sop.reviewMonitoringUpdate,
  monitoring: this.Sop.monitoring,
  verification: this.Sop.reviewMonitoringUpdate,
  steps: this.Sop.procedures.map(item => item.procedure),
  stepsmal: [],
  desc: this.Sop.descriptions.map(item => item.description),
  descmal: [],
  appendix: this.media,
  folder: "",
  revised_by: "",
  edited_by: "",
  assign_reviewers: "",
  assign_approvers: "",
  aeon_type: "",
  Sop_file: "",
  status: this.status,
  updated_at: "",
  created_at: this.getCurrentDate()
}, {
  headers: {
    'Content-Type': 'application/json'
  }
})
.then((response) => {
  // Handle the successful response from the backend API
  console.log(response.data);
})
.catch((error) => {
  // Handle any errors that occurred during the HTTP request
  console.error(error);
});
    },
    addProcedure() {
      const procedure = {
        procedureTitle: this.$refs.procedureTitle.value,
        procedureDescription: this.$refs.procedureDescription.value,
        appendixFile: this.$refs.appendixFile.files
      };
      this.procedures.push(procedure);
      this.uploadImage()
    },
 
   


async Pdf() {
  try {
    console.log('Sop form', this.Sop);
    console.log('Procedures in Form', this.Sop.procedures);
    console.log('Descriptions in Form', this.Sop.descriptions);
    console.log('Images in Form', this.Sop.images);
    console.log('Selected Approvers', this.selectedApprovers);
    console.log('Selected Reviewers', this.selectedUsers);

    // Sop.image is ready, generate PDF
    const pdf = generatePdf(this.Sop,this.base);
    console.log(pdf);
    this.$q.notify({
  message: 'SOP Generated',
  color: 'primary',
  position: 'top',
  style: { width: '1500px' },
  timeout: 1000,
  actions: [{ icon: 'close', color: 'white' }],
  classes: 'glossy',
});
this.$router.push('/dashboard');

  } catch (error) {
    console.error(error);
    // Handle error here
  }
},



  },
};

  </script>

<style scoped>




button:hover {
  background-color: #0ce9de;
}


label {
  display: block;
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
}



.user-list-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
}

.selected-users-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.selected-users {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}





  .user-list-container {
  display: flex;
  flex-wrap: wrap;
}

.user-list-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-list-container li {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}

status-dropdown-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}



.custom-select {
    width: 250px;
    border: none;
    background-color: #f7f7f7;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  }

.uploader{
  display: flex;
  justify-content: center;
  align-items: center;
}

.notification-wide {
  width: 400px;
}


.q-editor-custom {
  font-size: 16px;
  line-height: 1.5;
  padding: 10px;
  border: 2px solid #ddd;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.q-editor-custom .q-editor__content {
  outline: none;
  overflow-y: auto;
}

.q-editor-custom .q-editor__toolbar {
  display: none;
}

</style>