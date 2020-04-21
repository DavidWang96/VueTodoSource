<template>
  <div id="app">
    <router-view/>

    <confirmation-modal :ref="'confirmModal'"></confirmation-modal>
  </div>
</template>

<script>
import ConfirmationModal from './components/ConfirmationModal'

export default {
  name: 'App',
  created () {
    // При инициализации приложения загружаем данные из Local Storage если они имеются
    const storageState = localStorage.getItem('store_state')
    if (storageState !== null) {
      this.$store.commit('loadStorageData', storageState)
    }
  },
  components: {
    ConfirmationModal
  }
}
</script>

<style lang="scss">
@import "./assets/scss/app";
</style>
