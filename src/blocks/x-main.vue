<template>
  <div :class="$style.root">
    <h1 :class="$style.title">{{ title }}</h1>
    <div :class="$style.body">
      <p v-for="(text, key) in lines" :key="key">{{ text }}</p>
    </div>
    <x-cat width="252" height="232"/>
  </div>
</template>

<script>
import { getProducts } from '@a/products.js';
import XCat from '@b/x-cat/x-cat.vue';

export default {
  components: {
    XCat,
  },
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
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    this.products = await getProducts();
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
