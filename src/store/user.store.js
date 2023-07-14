import axios from 'axios'
import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const userId = ref('2f0ca549-999e-4f3a-bd0b-92025db11f8a')

  const actualUser = ref(null)



  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users?user_uuid=${userId.value}`)
      actualUser.value = response.data[0]
      return response.data
    }
    catch (error) {
      console.log(error)
    }


  }



  return { userId, getUser, actualUser }
})