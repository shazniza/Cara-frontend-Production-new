
<template>
     <div class="card">
    <div class="card-body">
  
  <div>
    <div style="display: flex; justify-content: center;">
  <img style="width:260px; height:100px;" ref="img" src="../assets/aeon.png"  />
</div>
  </div>

  <h4 style="text-align: center;" >Upload Sop</h4>

  <div style="display: flex; flex-direction: column; align-items: center;">
  <label for="sop-title" style="font-size: 18px; margin-bottom: 10px;">SOP Title:</label>
  <q-input rounded outlined  style="width: 800px;"></q-input>

</div>

<div style="display: flex; flex-direction: column; align-items: center;">
  <label for="sop-title" style="font-size: 18px; margin-bottom: 10px;">SOP Title:</label>
  <q-input rounded outlined  style="width: 800px;"></q-input>

</div>


<div style="display: flex; flex-direction: column; align-items: center;">
  <label for="sop-title" style="font-size: 18px; margin-bottom: 10px;">SOP Title:</label>
  <q-input rounded outlined  style="width: 800px;"></q-input>

</div>


<div style="display: flex; flex-direction: column; align-items: center;">
  <label for="sop-title" style="font-size: 18px; margin-bottom: 10px;">SOP Title:</label>
  <q-input rounded outlined  style="width: 800px;"></q-input>

</div>

<label  style="font-size: 18px; margin-bottom: 10px;">Folder:</label>
    
<div class="text-center">
  <select id="status" v-model="selectedFolder" class="custom-select">
    <option v-for="(folder, index) in folders" :key="index" :value="folder">{{ folder.name }}</option>
  </select>
</div>


  </div>
  </div>


    </template>
    
   <script>


import axios from 'axios';

export default {

  data() {
    return {
        folders:[],
      Selectedfolder:''
      
    };
    
  },


  created() {
    this.getFolders();
    },

    methods: {
        async  getFolders() {
      try {
      const response = await axios.get('https://api.caramyaeon.com.my/api/archivefolders');
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

    }


  
}


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