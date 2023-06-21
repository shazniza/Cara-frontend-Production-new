<template>
    <div class="container">
      <h1 class="my-4">SOP Library</h1>
      <Breadcrumb :folder-path="folderPath" @go-to-folder="goToFolder" @go-to-root="goToRoot" />
      <FolderView :current-folder="currentFolder" @open-folder="openFolder" @upload-file="uploadFile" />
      <button @click="createFolder">Create Folder</button>
    </div>
  </template>
  
  <script>
  import FolderView from "../";
  import Breadcrumb from "../views/components/Breadcrumb.vue";
  import { getFolderById, createFolder } from "../../Services/FolderService";
  
  export default {
    name: "SopLibrary",
    components: {
      FolderView,
      Breadcrumb,
    },
    data() {
      return {
        currentFolder: null,
        folderPath: [],
      };
    },
    created() {
      this.goToRoot();
    },
    methods: {
      goToRoot() {
        getFolderById("root")
          .then((folder) => {
            this.currentFolder = folder;
            this.folderPath = [];
          })
          .catch((error) => {
            console.error(error);
          });
      },
      goToFolder(folder) {
        getFolderById(folder.id)
          .then((folder) => {
            this.currentFolder = folder;
            this.folderPath.splice(
              this.folderPath.indexOf(folder) + 1,
              this.folderPath.length
            );
          })
          .catch((error) => {
            console.error(error);
          });
      },
      openFolder(folder) {
        getFolderById(folder.id)
          .then((folder) => {
            this.currentFolder = folder;
            this.folderPath.push(folder);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      uploadFile(file) {
        // implementation of uploading file
        console.log(file)
      },
      createFolder() {
        if (this.currentFolder) {
          createFolder(this.currentFolder.id, "New Folder")
            .then((folder) => {
              this.currentFolder.children.push(folder);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      },
    },
  };
  </script>
  