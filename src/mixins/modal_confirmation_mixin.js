export default {
  methods: {
    modalConfirm (msg) {
      // Вызываем подтверждающее модальное окно и передаем в его компонент сообщение
      const confirmModal = this.$root.$children[0].$refs.confirmModal
      confirmModal.openModal(msg)

      // Возвращаем promise для асинхронной обработки действия пользователя
      return new Promise((resolve, reject) => {
        // Если пользователь подтвердил с согласием - вызываем функцию resolve и передаем управление описываемой логики
        confirmModal.$on('confirm', () => {
          confirmModal.closeModal()
          resolve()
        })

        // Если пользователь ответил отказом - вызываем функцию reject
        confirmModal.$on('cancel', () => {
          confirmModal.closeModal()
          reject(new Error())
        })
      })
    }
  }
}
