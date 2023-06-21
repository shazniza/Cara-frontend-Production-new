<template>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#" @click="goToRoot"><i class="fas fa-home"></i></a></li>
        <li class="breadcrumb-item" v-for="(folder, index) in folderPath" :key="folder.id">
          <a href="#" @click="goToFolder(index)">{{ folder.name }}</a>
        </li>
      </ol>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      folderPath: Array
    },
    methods: {
      goToFolder(index) {
        this.$emit('go-to-folder', index);
      },
      goToRoot() {
        this.$emit('go-to-root');
      }
    }
  };
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  