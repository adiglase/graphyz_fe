import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const userData = ref(null)

  function setUserData(data) {
    userData.value = data
  }

  function resetUserData() {
    userData.value = null
  }

  return { userData, setUserData, resetUserData }
})
