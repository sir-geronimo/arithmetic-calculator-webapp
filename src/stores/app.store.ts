import { defineStore } from 'pinia'

interface State {
  loggedIn: boolean
  balance: number
}

export const useAppStore = defineStore('app-store', {
  state: (): State => ({
    loggedIn: false,
    balance: 100,
  }),
})