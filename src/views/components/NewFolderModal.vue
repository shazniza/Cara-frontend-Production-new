<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-content">
      <div class="box">
        <h3 class="title is-3">Create New Folder</h3>
        <div class="field">
          <label class="label">Folder Name:</label>
          <div class="control">
            <input class="input" type="text" v-model="folderName">
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click="createFolder">Create</button>
          </div>
          <div class="control">
            <button class="button is-link" @click="$emit('close')">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      folderName: ''
    };
  },
  methods: {
    createFolder() {
      this.$emit('create-folder', this.folderName);
      this.folderName = '';
    }
  }
};
</script>

<style>
  .modal-card {
    max-width: 500px;
  }
</style>
