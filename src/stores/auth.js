import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'vue3-admin-demo-auth'

function readInitialState() {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    return {
      token: '',
      username: '',
    }
  }

  try {
    return JSON.parse(saved)
  } catch {
    return {
      token: '',
      username: '',
    }
  }
}

export const useAuthStore = defineStore('auth', () => {
  const initialState = readInitialState()
  const token = ref(initialState.token)
  const username = ref(initialState.username)

  const isAuthenticated = computed(() => Boolean(token.value))

  function persist() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        token: token.value,
        username: username.value,
      }),
    )
  }

  function login({ username: inputUsername, password }) {
    if (inputUsername !== 'admin' || password !== 'admin123') {
      throw new Error('用户名或密码错误，请使用 admin / admin123 登录。')
    }

    token.value = `token-${Date.now()}`
    username.value = inputUsername
    persist()
  }

  function logout() {
    token.value = ''
    username.value = ''
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    token,
    username,
    isAuthenticated,
    login,
    logout,
  }
})
