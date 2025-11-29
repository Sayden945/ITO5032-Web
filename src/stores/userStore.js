import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)
  const firstName = ref('')

  function login(userData) {
    isAuthenticated.value = true
    user.value = userData
    firstName.value = userData.firstName || ''
    localStorage.setItem('isUserLoggedIn', 'true')
  }

  function logout() {
    isAuthenticated.value = false
    user.value = null
    firstName.value = ''
    localStorage.removeItem('isUserLoggedIn')
  }

  return { isAuthenticated, user, firstName, login, logout }
})
