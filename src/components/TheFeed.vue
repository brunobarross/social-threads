<template>

  <div class="feed">
    <TheThreadVue v-for="thread in filteredThreads" :key="thread.id" :thread="thread" />
  </div>
</template>

<script setup>
import TheThreadVue from "./TheThread.vue";
import { defineProps} from "vue";


const props = defineProps({

  filteredThreads: {
    type: Array,
  },
});
</script>

<style scoped>
.feed {
  height: calc(80vh - 13.125rem);
  overflow-y: scroll;
}
</style>
