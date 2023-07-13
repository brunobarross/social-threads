<template>
  <article class="feed-card">
    <div class="text-container">
      <div>
        <div class="img-container">
          <img :src="user.img" alt="Profile avatar" />
        </div>
        <div class="mt-2">
          <p>
            <strong>{{ user.handle }}</strong>
          </p>
          <p>{{ popUpFeedThread.text }}</p>
        </div>
      </div>
      <p class="sub-text">{{ timePassed }}</p>
    </div>
  </article>
</template>

<script setup>
import { defineProps, computed } from "vue";
import moment from 'moment'



const props = defineProps({
  popUpFeedThread: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
});

const timePassed = computed(() => {
  return moment().startOf("day").fromNow(props.popUpFeedThread.timestamp);
});
</script>

<style scoped></style>
