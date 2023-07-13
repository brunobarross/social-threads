<template>
  <div class="popup">
    <button @click="$emit('close-popup')">X</button>
    <template v-if="popUpFeedThreads">
      <ThePopUpThread
        v-for="popUpFeedThread in popUpFeedThreads"
        :key="popUpFeedThread.id"
        :user="user"
        :popUpFeedThread="popUpFeedThread"
      />
    </template>

    <TheThreadInputVue />
  </div>
</template>

<script setup>
import { defineEmits, inject } from "vue";
import ThePopUpThread from "./ThePopUpThread.vue";
import TheThreadInputVue from "./TheThreadInput.vue";
import { usePopUpStore } from "../store/popup.store.js";
import { useThreadsStore } from "../store/threads.store";
import { storeToRefs } from "pinia";

const { popUpFeedThreads } = storeToRefs(useThreadsStore());

const user = inject("user");
const emits = defineEmits(["close-popup"]);
</script>

<style scoped>
.popup {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 80vh;
  width: 100%;
  background-color: rgb(38, 38, 38);
  padding: 1.25rem;
  overflow-y: auto;
  box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px, rgba(0, 0, 0, 0.12) 0 -12px 30px,
    rgba(0, 0, 0, 0.12) 0 4px 6px, rgba(0, 0, 0, 0.17) 0 12px 13px,
    rgba(0, 0, 0, 0.09) 0 -3px 5px;
}
</style>
