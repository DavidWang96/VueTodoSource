import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cachedNote: {},
    notes: [
      {
        id: 0,
        name: 'Some name 1',
        todo: [
          {
            taskDescription: 'Task 1',
            isComplete: false
          },
          {
            taskDescription: 'Task 2',
            isComplete: true
          }
        ]
      },
      {
        id: 1,
        name: 'Some name 2',
        todo: [
          {
            taskDescription: 'Task 3',
            isComplete: false
          },
          {
            taskDescription: 'Task 4',
            isComplete: false
          }
        ]
      }
    ]
  },
  mutations: {
    updateNote (state, payload) {
      // Находим изменяемую запись по ID
      const itemIndex = state.notes.findIndex(item => item.id === payload.id)

      // Присваиваем новые данные, пришедшие в виде аргумента payload
      state.notes[itemIndex] = {
        id: payload.id,
        name: payload.name,
        todo: payload.todo
      }
    },
    addNote (state, payload) {
      // Объявляем переменную, определяющую максимальный ID в существующих записях, для определения нового ID для новой записи
      let maxId = 0

      // Перебираем массив записей, сравнивая их ID , получаем максимальный
      state.notes.map(item => {
        if (item.id > maxId) maxId = item.id
      })

      // Добавляем в массив записей новый элемент и присваиваем ID
      state.notes.push({
        id: ++maxId,
        name: payload.name,
        todo: payload.todo
      })
    },
    removeNote (state, payload) {
      // Находим по ID запись и удаляем методом splice, чтобы не повредить архитектуру реактивности
      const itemIndex = state.notes.findIndex(item => item.id === payload)
      state.notes.splice(itemIndex, 1)
    },
    cacheChanges (state, payload) {
      // Заносим в отдельный объект - несохраненную запись
      state.cachedNote = payload
    },
    loadStorageData (state, payload) {
      // Получаем данные из Local Storage, преобразуем JSON строку в объект
      // И обновляем массив записей
      const storageData = JSON.parse(payload)
      state.notes.splice(0, state.notes.length, ...storageData)
    }
  },
  getters: {
    getNoteById: state => id => {
      // Получаем запись по ID и возвращаем его в виде глубоко - клонированного объекта без ссылок через методы JSON
      const itemIndex = state.notes.findIndex(item => item.id === id)
      return JSON.parse(JSON.stringify(state.notes[itemIndex]))
    },
    getAllNodes: state => {
      return state.notes
    },
    getCachedNode: state => {
      return state.cachedNote
    }
  },
  actions: {
    // Вызов мутации через данный посредник, для реализации асинхронности
    SET_STATE: async (context, data) => {
      context.commit(data.commit, data.payload)
    }
  }
})
