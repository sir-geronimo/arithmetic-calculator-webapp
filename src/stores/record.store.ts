import { defineStore } from 'pinia'

interface State {
  records: []
}

export const useRecordStore = defineStore('record-store', {
  state: (): State => ({
    records: [],
  })
})