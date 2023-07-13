<template>

    <template v-if="actualUser">
      <TheNav :url="actualUser.instagram_url" />
      <TheHeader
        :user="actualUser"
        :viewThreadsFeed="viewThreadsFeed"
        @set-threads-view="setViewThreadsFeed"
      />
      <TheFeed :filteredThreads="filteredThreads" />
      <transition name="slide-up">
        <ThePopUp v-if="isOpenPopUp" @close-popup="setIsOpenPopUp(false)" />
      </transition>
      <div class="flex justify-center items-center">
        <TheWriteIcon @click="setIsOpenPopUp(true)" />
      </div>
    </template>

</template>
<script setup>
import { ref, onMounted, provide } from "vue";
import TheNav from "./components/TheNav.vue";
import TheHeader from "./components/TheHeader.vue";
import ThePopUp from "./components/ThePopUp.vue";
import TheFeed from "./components/TheFeed.vue";
import TheWriteIcon from "./components/TheWriteIcon.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "./store/user.store.js";
import { useThreadsStore } from "./store/threads.store.js";
import { usePopUpStore } from "./store/popup.store.js";

const { actualUser } = storeToRefs(useUserStore());
const { threads, viewThreadsFeed, filteredThreads } = storeToRefs(
  useThreadsStore()
);

const { isOpenPopUp } = storeToRefs(usePopUpStore());

const { setIsOpenPopUp } = usePopUpStore();
const { getUser } = useUserStore();
const { getThreads } = useThreadsStore();

provide("user", actualUser);

const setViewThreadsFeed = (value) => {
  viewThreadsFeed.value = value;
};

onMounted(async () => {
  await getUser();
  await getThreads();
});
</script>


<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transform: translateY(100%);
  transition: transform 0.5s;
}

.slide-up-enter,
.slide-up-leave-to,
.slide-up-enter-to,
.slide-up-leave {
  transform: translateY(0);
}

</style>
