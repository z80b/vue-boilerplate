<template>
  <div :class="$style.root">
    <x-main
      title="test"
      :lines="[
        'dasdads',
        'asdsadsad',
        'adasd'
      ]"/>
  </div>
</template>

<script>
import XMain from '@blocks/x-main.vue';

export default {
  components: {
    XMain,
  },
};
</script>

<style module>
.root {
  display: block;
}
</style>
