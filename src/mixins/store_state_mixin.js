export default {
  methods: {
    changeStoreState (commit, payload) {
      // Метод - посредник для вызова мутации
      // Вызываем "Действие" SET_STATE у Store, которое возвращает Promise, тем самым позволив себе "Пост обработку"
      this.$store.dispatch('SET_STATE', {
        commit: commit,
        payload: payload
      }).then(() => {
        // После изменения Store - записываем новые данные в Local Storage
        localStorage.setItem('store_state', JSON.stringify(this.$store.state.notes))
      })
    }
  }
}
