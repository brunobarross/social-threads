import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePopUpStore = defineStore('popUpStore', () => {

    const isOpenPopUp = ref(false)

    const setIsOpenPopUp = (value) => {
        isOpenPopUp.value = value
    }

    return { isOpenPopUp, setIsOpenPopUp }
})