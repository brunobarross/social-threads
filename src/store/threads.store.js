import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { h, ref, watch } from 'vue'
import { useUserStore } from './user.store'

export const useThreadsStore = defineStore('threadsStore', () => {
    const threads = ref(null);
    const { userId, actualUser } = storeToRefs(useUserStore())
    const viewThreadsFeed = ref(true);

    const filteredThreads = ref(null);

    const interectedThread = ref(null)

    const popUpFeedThreads = ref(null)

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
            const { data } = await axios.get(`http://localhost:3000/threads?reply_to=${interectedThread.value.id}`)
            popUpFeedThreads.value = data
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




    return { getThreads, threads, viewThreadsFeed, getThreads, filteredThreads, postThreadLike, setInterectedThread, popUpFeedThreads }
})