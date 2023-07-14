<template>
    <div>
        <p></p>
        <input type="text" placeholder="What's on your mind?" :model-value="text" @input="$emit('update:text', $event.target.value)">
        <button class="primary" @click="$emit('post-thread')">Post</button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const emit = defineEmits(['post-thread', 'update:text']);


const props = defineProps({
    text: {
        type: String,
        required: true,
    },
});

</script>

<style scoped>

input{
    background-color: transparent;
    border: 1px solid rgb(114, 114, 114);
    padding: .625rem;
    width: 100%;
    margin: .625rem 0;
    box-sizing: border-box;
    border-radius: .3125rem;
    color: rgb(250, 250, 250);

}

input:focus{
    outline: none;

}

</style>