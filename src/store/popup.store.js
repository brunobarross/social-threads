import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePopUpStore = defineStore('popUpStore', () => {

    const isOpenPopUp = ref(false)

    const popUpFeedUser = ref(null)

    const setIsOpenPopUp = (value) => {
        isOpenPopUp.value = value
    }

    const getPopUpFeedUser = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/users?user_uuid=${id}`)
            popUpFeedUser.value = response.data[0]
            console.log(response.data)
            return response.data
        }
        catch (error) {
            console.log(error)
        }


    }

    return { isOpenPopUp, setIsOpenPopUp, getPopUpFeedUser, popUpFeedUser }
})