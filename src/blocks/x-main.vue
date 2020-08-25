<template>
  <div :class="$style.root">
    <h1 :class="$style.title">{{ title }}</h1>
    <div :class="$style.body">
      <p v-for="(text, key) in lines" :key="key">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    lines: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>

<style module>
.root {
  color: #000;
}

.title {
  font-size: 24px;
}

.body {
  font-size: 12px;
  color: #888;
}
</style>
