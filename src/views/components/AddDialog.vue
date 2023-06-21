<template>
    <div>
      <button >Open Modal</button>
  
      <Modal :show-modal="localShowModal" @close="closeModal">
        <slot></slot>
      </Modal>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showModal: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        isModalShown: this.showModal
      }
    },
    methods: {
      close() {
        this.isModalShown = false;
        this.$emit('update:showModal', false);
      }
    }
  }
</script>
