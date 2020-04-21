<template>
    <div>
        <transition name="fade">
            <div v-if="isModalActive" class="confirmation-modal">
                <div class="modal-backdrop" @click="onCancel">&nbsp;</div>
                <div class="modal">
                    <div class="modal__content">
                        <div class="modal__header">
                            <p>Подтвердите действие</p>
                        </div>
                        <div class="modal__body">
                            <p>{{ message }}</p>
                        </div>
                        <div class="modal__footer">
                            <button class="main-button button-red" @click="onCancel">Отменить</button>
                            <button class="main-button button-violet" @click="onConfirm">Принять</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      isModalActive: false
    }
  },
  methods: {
    openModal (message) {
      this.message = message
      this.isModalActive = true
    },
    closeModal () {
      this.isModalActive = false
    },
    onConfirm () {
      this.closeModal()
      this.$emit('confirm')
    },
    onCancel () {
      this.closeModal()
      this.$emit('cancel')
    }
  },
  watch: {
    isModalActive () {
      // При изменении состояния модального окна - убираем или присваиваем класс у body
      this.isModalActive ? document.body.className = 'is-modal-opened' : document.body.className = ''
    }
  }
}
</script>
