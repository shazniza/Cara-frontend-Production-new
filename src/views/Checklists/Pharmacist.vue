<template>
    <div class="q-flex q-justify-center q-pa-md">
        <div class="q-flex q-justify-center q-pa-md">
    <q-card>
      <q-card-body class="text-center">
        <div v-if="!formStarted">
            <div style="display: flex; justify-content: center;">
<img style="width:260px; height:100px;" ref="img" src="../../assets/aeon.png"  /> <br><br>
</div> <br><br>
<h2 class="text-center">Pharamcist  Checklist</h2>
            <div>
    <!-- Date Selection Dropdown -->
    <label style="font-size: 20px;" for="date">Date:</label>
    <input type="date" id="date" v-model="selectedDate" />
<br><br><br>
    <!-- Store/Mall Code Selection Dropdown -->
    <label style="font-size: 20px;" for="storeCode">Store/Mall Code:</label>
    <select id="storeCode" v-model="selectedStoreCode">
      <option value="">PLEASE SELECT STORE/MALL</option>
      <option value="001">Store 1</option>
      <option value="002">Store 2</option>
      <option value="003">Store 3</option>
    </select>
    <br><br><br>
    <!-- Prepared By Selection Dropdown -->
    <label style="font-size: 20px;" for="name">Prepared By:</label>
    <select id="name" v-model="selectedName" @change="updateId">
      <option value="">PLEASE SELECT YOUR NAME</option>
      <option v-for="option in nameOptions" :key="option.value.id" :value="option.value">{{ option.label }}</option>
    </select>
    <br><br><br>
    <!-- ID Input Field -->
    <label style="font-size: 20px;" for="id">ID:</label>
    <input type="text" id="id" v-model="selectedId" :disabled="!selectedName" />
  </div>
  <br><br><br>
          <q-btn @click="formStarted = true" label="Start Form" />
        </div>
        <div v-else>
          <!-- Your form code goes here -->
          <q-card>

<q-card-body class="text-center">
    <div style="display: flex; justify-content: center;">
<img style="width:260px; height:100px;" ref="img" src="../../assets/aeon.png"  /> <br><br>
</div>
    <h2 class="text-center">Pharamcist  Checklist</h2>
    
  <form @submit.prevent="submitForm">
    <q-card-title class="text-h4 text-center">{{ currentPageTitle }}</q-card-title> <br><br><br><br><br><br>
    <div v-for="(question, index) in currentQuestions" :key="index" class="q-mb-md">
      <h5>{{ question.text }}</h5>
      <br />
      <template v-if="question.type === 'text'">
        <input type="text" v-model="answers[index]" />
      </template>
      <template v-if="question.type === 'yesno'">
        <h6>Score:</h6>
        <label>
          <input type="radio" v-model="answers[index]" value="yes" />
          0
        </label>
        <label>
          <input type="radio" v-model="answers[index]" value="no" />
          1
        </label>
        <label>
          <input type="radio" v-model="answers[index]" value="Not Applicable" />
          Not Applicable
        </label> <br><br>
        <h6>Remarks</h6>
        <textarea name="comment" id="comment" rows="4" cols="50" placeholder="Comment here"></textarea> <br><br>
        <label for="attachment">Attachment:</label>
        <div>
    <input type="file" ref="fileInput" @change="previewImages" multiple>
    <div v-if="imagePreviews.length > 0">
      <div v-for="(preview, index) in imagePreviews" :key="index">
        <img :src="preview" alt="Preview">
      </div>
    </div>
  </div>

      </template>
      <template v-if="question.type === 'choice'">
        <label v-for="(option, optionIndex) in question.options" :key="optionIndex">
          <input type="radio" v-model="answers[index]" :value="option" />
          {{ option }}
        </label>
      </template>
      <template v-if="question.type === 'file'">
        <input type="file" @change="handleFileUpload($event, index)" />
      </template>
    </div>
    <br />
    <div class="q-mt-md q-flex q-justify-around">
    <q-btn  label="Select Users" @click="this.formStarted = false" color="primary" />
      <q-btn :disabled="currentPage === 1" @click="previousPage" label="Previous" class="q-mr-md" />
      <q-btn :disabled="currentPage === totalPages" @click="nextPage" label="Next" class="q-mr-md" />
      <q-btn  v-if="currentPage === totalPages"  type="submit" label="Submit" color="primary" />
    </div>
  </form>
  <h6>Page {{ currentPage }} of {{ totalPages }}</h6>
</q-card-body>
</q-card>
        </div>
      </q-card-body>
    </q-card>
  </div>

    </div>
  </template>
  
  
  
  
  <script>
  import questions from "../../assets/files/Pharmacist.json";
  
  export default {
    name: "Form",
    data() {
      return {
        imagePreviews: [],
        currentPage: 1,
        answers: [],
        totalPages: questions.pages.length,
        currentQuestions: questions.pages[0].questions,
        currentPageTitle: questions.pages[0].title,
        titles: questions.pages.map(page => page.title),
        formStarted: false,
        selectedDate: null,
      selectedStoreCode: null,
      selectedName: null,
      selectedId: null,
      nameOptions: [
        { label: 'John Smith', value: { name: 'John Smith', id: '001' } },
        { label: 'Jane Doe', value: { name: 'Jane Doe', id: '002' } },
        { label: 'Bob Johnson', value: { name: 'Bob Johnson', id: '003' } }
      ]
      };
    },
    methods: {
        previewImages() {
      const files = this.$refs.fileInput.files;
      this.imagePreviews = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imagePreviews.push(event.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
        },
         updateId() {
      // Set the selected ID based on the selected name
      this.selectedId = this.selectedName ? this.selectedName.id : null;
    },
      submitForm() {
        console.log("Answers:", this.answers);
      },
      previousPage() {
        console.log("Going to previous page");
        this.currentPage--;
        this.currentQuestions = questions.pages[this.currentPage - 1].questions;
        this.currentPageTitle = questions.pages[this.currentPage - 1].title;
      },
      nextPage() {
        console.log("Going to next page");
        this.currentPage++;
        this.currentQuestions = questions.pages[this.currentPage - 1].questions;
        this.currentPageTitle = questions.pages[this.currentPage - 1].title;
      },
      handleFileUpload(event, index) {
        console.log("File uploaded", event.target.files[0]);
        console.log(index)
        // Do something with the file...
      },
    },
  };
  </script>
  

  <style>
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}


</style>