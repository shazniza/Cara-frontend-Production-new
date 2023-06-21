<template>
    <div class="q-flex q-justify-center q-pa-md">
        <div class="q-flex q-justify-center q-pa-md">
    <q-card >
      <q-card-body class="text-center">
        <div v-if="!formStarted">
            <div style="display: flex; justify-content: center;">
<img style="width:260px; height:100px;" ref="img" src="../../assets/aeon.png"  /> <br><br>
</div> <br><br>
<h2 class="text-center">Security Adit Checklist</h2>
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

<q-card-body class="text-center ">
    <div style="display: flex; justify-content: center;">
<img style="width:260px; height:100px;" ref="img" src="../../assets/aeon.png"  /> <br><br>
</div>
    <h2 class="text-center">Security Adit Checklist</h2>
    
  <form @submit.prevent="submitForm">
    <q-card-title class="text-h4 text-center">{{ currentPageTitle }}</q-card-title> <br><br><br><br><br><br>
    <div v-for="(question, index) in currentQuestions" :key="index" class="q-mb-md pink-border">
    
      <h6> {{ index + 1 }} ) {{ question.text }}</h6>
      <br />
      <template v-if="question.type === 'yesno'">
        <h6>Score:</h6>

        <label>
  <input type="radio" v-model="answers[question.id]" value="no" :required="!answers[question.id]" @change="updateScore(question.id)" />
  0
</label>
<label>
  <input type="radio" v-model="answers[question.id]" value="yes" :required="!answers[question.id]" @change="updateScore(question.id)" />
  1
</label>
<label>
  <input type="radio" v-model="answers[question.id]" value="Not Applicable" :required="!answers[question.id]" @change="updateScore(question.id)" />
  Not Applicable
</label>




<br><br>
        <h6>Remarks</h6>
        <textarea v-model="remarks[question.id]" rows="4" cols="50" placeholder="Comment here"></textarea><br><br>
        <label for="attachment">Attachment:</label>
        <div>

          <h6>Uploaded Images:</h6>
      <div v-for="(attachment, imageIndex) in uploadedImages[question.id]" :key="imageIndex">
        <img :src="attachment" alt="Uploaded Image" style="max-width: 200px;" />
        <button @click="removeImage(question.id, imageIndex)">Remove</button>

      </div>

      <label for="attachment">Attachment:</label>
      <div style="margin-bottom: 20px;">
        <input type="file" ref="fileInput" @change="previewImages($event, question.id)" multiple>
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
      <div class="score-box">
  Score: {{ pagescore }}
</div>
    <div class="q-mt-md q-flex q-justify-around">
    <q-btn  label="Select Users" @click="this.formStarted = false" color="primary" />
    <q-btn  @click="saveRemarks" label="Save" class="q-mr-md" />
      <q-btn :disabled="currentPage === 1" @click="previousPage" label="Previous" class="q-mr-md" />
      <q-btn :disabled="currentPage === totalPages" @click="nextPage" label="Next" class="q-mr-md" />
      <q-btn  v-if="currentPage === totalPages"  type="submit" label="Submit" color="primary" />
    </div>
   <!--  {{ numYesAnswers }} -->
 
   <!--  {{ this.answers }}
    {{ this.attachments }} -->
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
  import questions from "../../assets/files/Security.JSON";
  import { generatePdf } from  '../../Services/generatechecklist'
  
  export default {
    name: "Form",
    data() {
      return {
        uploadedImages: {},
        numYesAnswers: 0,
        currentPage: 1,
        answers: [],
        remarks: [],
        attachments: {},
        score: [],
        total:0,
        allQuestions: [],
        pagescore:0,
        pageScores: [],
        remarksObject: {},
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

created(){
  this.currentQuestions = questions.pages[this.currentPage - 1].questions;
  this.currentPageTitle = questions.pages[this.currentPage - 1].title;
  this.allQuestions.push(...this.currentQuestions);
},

    methods: {
        validateForm() {
      const selectedValue = this.answers[this.index];
      if (!selectedValue) {
        this.errorMessage = 'Please select a score.';
        return false; // Prevent further actions
      } else {
        this.errorMessage = ''; // Clear the error message
        // Perform other actions or navigate to the next page
      }
    },
         updateId() {
      // Set the selected ID based on the selected name
      this.selectedId = this.selectedName ? this.selectedName.id : null;
    },

      // Iterate over the remarks object
      submitForm() {
  const remarksWithQuestionId = {};

  for (const questionId in this.allQuestions) {
    const remark = this.remarks[questionId] || null;
    const answer = this.answers[questionId] || null;
    const attachment = this.attachments[questionId] || null;
    const questionText = this.allQuestions[questionId].text || '';

    const { pageTitle, pageScore } = this.getPageInfoForQuestion(questionId);

    remarksWithQuestionId[questionId] = {
      remark: remark || 'No remarks added!',
      answer,
      attachment,
      questionText,
      pageTitle,
      pageScore, // Add the page score to the object
    };
  }

  const totalQuestionTexts = this.allQuestions.map((question) => question.text);
  remarksWithQuestionId.totalQuestions = totalQuestionTexts;

  // Insert uploaded images into remarksWithQuestionId
  for (const questionId in this.uploadedImages) {
    const imageArray = this.uploadedImages[questionId];
    remarksWithQuestionId[questionId].attachment = imageArray;
  }

  console.log('Final object:', remarksWithQuestionId);
  generatePdf(remarksWithQuestionId, this.uploadedImages, this.allQuestions);
  // Rest of your code...
},


getPageInfoForQuestion(questionId) {
  // Logic to determine the page title based on the question ID
  // Modify this logic based on how your page titles are structured or stored

  let pageTitle = '';
  if (questionId >= 0 && questionId <= 4) {
    pageTitle = 'Store Opening';
  } else if (questionId >= 5 && questionId <= 10) {
    pageTitle = 'Store Closing';
  } else if (questionId >= 11 && questionId <= 16) {
    pageTitle = 'Staff Entrance Area';
  } else if (questionId >= 17 && questionId <= 22) {
    pageTitle = 'Loading Bay Area';
  } else if (questionId >= 23 && questionId <= 34) {
    pageTitle = 'Customer Entrance';
  } else if (questionId >= 35 && questionId <= 40) {
    pageTitle = 'EAS(Electronic Article Surveillance)';
  } else if (questionId >= 41 && questionId <= 54) {
    pageTitle = 'Selling Area Security';
  } else if (questionId >= 55 && questionId <= 64) {
    pageTitle = 'CCTV';
  } else if (questionId >= 65 && questionId <= 70) {
    pageTitle = 'Backroom Store Area';
  } else if (questionId >= 71 && questionId <= 74) {
    pageTitle = 'Account Room';
  } else if (questionId >= 75 && questionId <= 79) {
    pageTitle = 'PA Zero';
  } else if (questionId == 80) {
    pageTitle = 'Waste Disposal';
  } else if (questionId == 81) {
    pageTitle = 'Security Training';
  } else if (questionId >= 82 && questionId <= 83) {
    pageTitle = 'Security and LINE Briefing';
  } else if (questionId == 84) {
    pageTitle = 'LOSS Meeting';
  } else if (questionId == 85) {
    pageTitle = 'Security and LINE Briefing';
  } else if (questionId == 86) {
    pageTitle = 'Vendors Meeting (Security)';
  } else if (questionId >= 87 && questionId <= 88) {
    pageTitle = 'Meeting with Local Government Enforcement Agencies';
  } else {
    pageTitle = 'Default Page';
  }

  // Find the index of the page based on the page title
  const pageIndex = questions.pages.findIndex((page) => page.title === pageTitle);

  // Retrieve the page score from the score array based on the pageIndex
  const pageScore = this.pageScores[pageIndex] || 0;

  // Return the page title and score
  return { pageTitle, pageScore };
},


updateScore(questionId) {
    console.log('Question ID:', questionId);
    console.log('Answers:', this.answers);

    const currentPageIndex = this.currentPage - 1;
    const currentPageQuestions = questions.pages[currentPageIndex].questions;

    const currentPageScore = currentPageQuestions.reduce((total, question) => {
      if (question.id === questionId && this.answers[questionId] === 'yes') {
        return total + 1;
      }
      return total;
    }, this.score[currentPageIndex] || 0);

    // Update the score for the current page
    this.score.splice(currentPageIndex, 1, currentPageScore);

    // Calculate the total score by summing up all the scores
    this.total = this.score.reduce((total, score) => total + score, 0);

    // Save the previous page score in the pageScores array
    if (this.currentPage > 1) {
      const previousPageIndex = this.currentPage - 2;
      this.pageScores.splice(previousPageIndex, 1, this.score[previousPageIndex]);
    }
    this.pagescore = currentPageScore
    console.log('Current Page Score:', currentPageScore);
    console.log('Total Score:', this.total);
    console.log('Page Scores:', this.pageScores);
  },

  saveRemarks() {
    const remarksWithQuestionId = {};

for (const questionId in this.allQuestions) {
  const remark = this.remarks[questionId] || null;
  const answer = this.answers[questionId] || null;
  const attachment = this.attachments[questionId] || null;
  const questionText = this.allQuestions[questionId].text || '';

  const { pageTitle, pageScore } = this.getPageInfoForQuestion(questionId);

  remarksWithQuestionId[questionId] = {
    remark: remark || 'No remarks added!',
    answer,
    attachment,
    questionText,
    pageTitle,
    pageScore, // Add the page score to the object
  };
}

const totalQuestionTexts = this.allQuestions.map((question) => question.text);
remarksWithQuestionId.totalQuestions = totalQuestionTexts;

// Insert uploaded images into remarksWithQuestionId
for (const questionId in this.uploadedImages) {
  const imageArray = this.uploadedImages[questionId];
  remarksWithQuestionId[questionId].attachment = imageArray;
}

console.log('Final object:', remarksWithQuestionId);
localStorage.setItem('remarksData', JSON.stringify(remarksWithQuestionId));

this.$q.notify({
  message: 'Saved in drafts',
  color: 'positive',
  position: 'top',
  style: { width: '1500px' },
  timeout: 1000,
  actions: [{ icon: 'close', color: 'white' }],
  classes: 'glossy'
  
});
 

this.$router.replace('Archivechecklist');

},




  previewImages(event, questionId) {
      const fileList = event.target.files;

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          const image = e.target.result;

          // Update the uploadedImages object
          if (!this.uploadedImages[questionId]) {
            this.uploadedImages[questionId] = [];
          }
          this.uploadedImages[questionId].push(image);
        };
        console.log(this.uploadedImages)
        reader.readAsDataURL(file);
      }
    },
    // ...

    // ...



    removeImage(questionId, imageIndex) {
  if (this.uploadedImages[questionId]) {
    this.uploadedImages[questionId].splice(imageIndex, 1);
  }
},

      previousPage() {
        console.log("Going to previous page");
        this.currentPage--;
        this.currentQuestions = questions.pages[this.currentPage - 1].questions;
        this.currentPageTitle = questions.pages[this.currentPage - 1].title;
      },
      nextPage() {
  // Reset the current page score to zero
  this.pagescore = 0;

  // Proceed to the next page
  console.log("Going to next page");
  this.currentPage++;
  this.currentQuestions = questions.pages[this.currentPage - 1].questions;
  this.currentPageTitle = questions.pages[this.currentPage - 1].title;
  this.allQuestions.push(...this.currentQuestions);
  console.log('allquestions', this.allQuestions)
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

.score-box {
  display: inline-block;
  background-color: white;
  padding: 5px 10px;
  border: 1px solid black;
}

.pink-border {
  border: 3px solid rgb(228, 28, 191);
}



</style>