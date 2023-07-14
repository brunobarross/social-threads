import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { h, ref, watch } from 'vue'
import { useUserStore } from './user.store'

export const useThreadsStore = defineStore('threadsStore', () => {
    const threads = ref(null);
    const { userId, actualUser } = storeToRefs(useUserStore())
    const viewThreadsFeed = ref(true);
    const filteredThreads = ref(null);
    const interectedThread = ref(null);
    const popUpFeedThreads = ref(null);
    const repliesLength = ref(null);

    const getThreads = async () => {

        try {
            const response = await axios.get(`http://localhost:3000/threads?thread_from=${userId.value}`)
            threads.value = response.data
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }


    const getThreadsFeed = async () => {
        if (viewThreadsFeed.value) {
            const standAloneThreads = threads.value?.filter(thread => thread.reply_to === null)
            filteredThreads.value = standAloneThreads;
        }

        if (!viewThreadsFeed.value) {
            const replyThreads = threads.value?.filter(thread => thread.reply_to !== null)
            filteredThreads.value = replyThreads;
        }
    }


    const postThreadLike = async (threadId) => {
        const postAtual = threads.value.find(thread => thread.id === threadId)
        const hasBeenLikedByActualUser = postAtual.likes.some(like => like.user_uuid === actualUser.value.user_uuid)



        if (!hasBeenLikedByActualUser) {
            postAtual.likes.push({ user_uuid: actualUser.value.user_uuid })
            try {
                const { data } = await axios.patch(`http://localhost:3000/threads/${threadId}`, postAtual)
                return data
            }
            catch (error) {
                console.log(error)
            }
        }
    }


    const setInterectedThread = (threadId) => {
        const postAtual = threads.value.find(thread => thread.id === threadId)
        interectedThread.value = postAtual
    }


    const getReplies = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/threads?reply_to=${interectedThread.value?.id}`)
            popUpFeedThreads.value = data
            repliesLength.value = data.length
        }
        catch (error) {
            console.log(error)
        }

    }



    const postThread = async (texto) => {
        const objPost = {
            timestamp: new Date(),
            thread_from: actualUser.value.user_uuid,
            thread_to: actualUser.value.user_uuid || null,
            reply_to: interectedThread.value?.id || null,
            text: texto,
            likes: []
        }
        try {
            const { data } = await axios.post(`http://localhost:3000/threads`, objPost)
            await getThreads()
            await getReplies()
            return data
        }
        catch (error) {
            console.log(error)
        }
    }



    watch(
        () => viewThreadsFeed.value,
        (v) => {
            getThreadsFeed()
        });

    watch(
        () => threads.value,
        (v) => {
            getThreadsFeed()
        }

    )

    watch(
        () => actualUser.value,
        (v) => {
            getThreads()
        }

    )

    watch(
        () => interectedThread.value,
        (v) => {
            getReplies()
        }

    )

    watch(
        () => filteredThreads.value,
        (v) => {
            getReplies()
        }

    )




    return { getThreads, threads, viewThreadsFeed, getThreads, filteredThreads, postThreadLike, setInterectedThread, popUpFeedThreads, postThread, repliesLength }
})