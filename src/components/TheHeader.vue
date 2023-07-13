<template>
  <header v-if="user">
    <div class="info-container mb-4">
      <div class="user-info-container">
        <h1>{{ user.username }}</h1>
        <p>{{ user.handle }} <span class="threads-info">threads.net</span></p>
      </div>
      <div class="img-container">
        <img :src="user.img" alt="profile avatar" />
      </div>
    </div>

    <p>{{ user.bio }}</p>
    <div class="sub-info-container">
      <p class="sub-text">
        {{ user.followers.length }} followes •
        <a :href="user.link">{{ user.link.replace("https://www.", "") }}</a>
      </p>
    </div>
    <button @click="handleClickURLCopy" class="primary">Share Profile</button>
    <div class="button-container">
      <button
        :class="{ active: viewThreadsFeed }"
        @click="$emit('set-threads-view', true)"
      >
        Threads
      </button>
      <button
        :class="{ active: !viewThreadsFeed }"
        @click="$emit('set-threads-view', false)"
      >
        Replies
      </button>
    </div>
  </header>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

function handleClickURLCopy() {
  navigator.clipboard.writeText("I am a URL");
}

const props = defineProps({
  user: {
    type: Object,
  },
  viewThreadsFeed: {
    type: Boolean,
  },
});

const emits = defineEmits(["set-threads-view"]);
</script>

<style scoped>
.info-container {
  display: flex;
  justify-content: space-between;
}
.img-container {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  overflow: hidden;
}

.img-container img {
  height: 110%;
  width: 100%;
  object-fit: cover;
}

.threads-info {
  background-color: rgb(59, 59, 59);
  color: rgb(114, 114, 114);
  font-size: 0.8125rem;
  padding: 0.1875rem 0.375rem;
  border-radius: 1.25rem;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.button-container button {
  flex: 1;
  border: none;
  background-color: transparent;
  padding: 0.4375rem;
  color: rgb(250, 250, 250);
  font-weight: bold;
  border-bottom: 1px solid rgb(114, 114, 114);
  transition: 0.3s ease-in-out;
}

.button-container button.active,
.button-container button:hover {
  border-bottom: 2px solid rgb(250, 250, 250);
}
</style>
