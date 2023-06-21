<template>
    <div class="modal" :class="{ 'is-active': show }">
      <div class="modal-background" @click="close"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Upload File</p>
          <button class="delete" aria-label="close" @click="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="file is-boxed">
            <label class="file-label">
              <input class="file-input" type="file" @change="handleFileInput" ref="fileInput" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
            </label>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="upload" :disabled="!file">Upload</button>
          <button class="button" @click="close">Cancel</button>
        </footer>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        file: null
      };
    },
    methods: {
      close() {
        this.$emit("close");
      },
      handleFileInput(event) {
        this.file = event.target.files[0];
      },
      upload() {
        this.$emit("upload-file", this.file);
        this.close();
        this.file = null;
        this.$refs.fileInput.value = null;
      }
    }
  };
  </script>  