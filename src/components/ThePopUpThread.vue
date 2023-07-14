<template>
  <article class="feed-card">
    <div class="text-container">
      <div>
        <div class="img-container">
          <img :src="popUpFeedUser?.img" alt="Profile avatar" />
        </div>
        <div class="mt-2">
          <p>
            <strong>{{ popUpFeedUser?.handle }}</strong>
          </p>
          <p>{{ popUpFeedThread?.text }}</p>
        </div>
      </div>
      <p class="sub-text">{{ timePassed }}</p>
    </div>
  </article>
</template>

<script setup>
import { defineProps, computed } from "vue";
import {storeToRefs} from "pinia";
import moment from "moment";
import { onMounted } from "vue";
import {usePopUpStore} from "../store/popup.store.js";


const {getPopUpFeedUser} = usePopUpStore();

const {popUpFeedUser} = storeToRefs(usePopUpStore());

const props = defineProps({
  popUpFeedThread: {
    type: Object,
    required: true,
  },
});



const timePassed = computed(() => {
  return moment().startOf("day").fromNow(props.popUpFeedThread.timestamp);
});

onMounted(async () => {
  await getPopUpFeedUser(props.popUpFeedThread.thread_from);
});
</script>

<style scoped></style>
