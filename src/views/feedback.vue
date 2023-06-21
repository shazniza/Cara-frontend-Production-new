<template>
    <div class="q-pa-md">
      <q-card>
        <q-card-section class="text-center">
          <h2 class="text-h5">Feedback</h2>
          <hr class="my-4" />
  
          <q-input
            filled
            label="User ID"
            v-model="userId"
            class="mb-3"
          />
  
          <q-input
            filled
            label="Business Unit"
            v-model="businessUnit"
            class="mb-3"
          />
  
          <q-input
            filled
            type="textarea"
            label="Comments"
            v-model="comments"
            class="mb-3"
          />
        </q-card-section>
  
        <q-card-actions align="center">
          <q-btn label="Submit" color="primary" @click="submitFeedback" />
        </q-card-actions>
      </q-card>
    </div>
  </template>
  
  
  
  
  <script>
  export default {
    name: "Feedback",
    data() {
      return {
        feedback: {
          comments: "",
        },
      };
    },
    methods: {
      submitForm() {
        // Handle form submission here
      },
    },
  };
  </script>
  