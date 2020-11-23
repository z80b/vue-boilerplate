<template>
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox">
    <slot></slot>
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',      
    },
    viewBox: {
      type: String,
      default: '',
    },
  },
}
</script>
