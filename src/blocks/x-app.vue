<template>
  <div :class="$style.root">
    <x-main
      title="test"
      :lines="[
        'dasdads',
        'asdsadsad',
        'adasd',
        'fwefwefwef',
        'sadsadsad',
        'dwqdqwdqwdwq',
      ]"/>
  </div>
</template>

<script>
import XMain from '@b/x-main.vue';

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
