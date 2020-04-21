<template>
    <div>
        <transition name="fade">
            <div v-if="isModalActive" class="add-note-modal">
                <div class="modal-backdrop" @click="closeModal">&nbsp;</div>
                <div class="modal modal_large">
                    <div class="modal__content">
                        <div class="modal__header">
                            <p>Добавить заметку</p>
                        </div>
                        <div class="modal__body">
                            <note-form :ref="'noteForm'" @formConfirmed="closeModal"></note-form>
                        </div>
                        <div class="modal__footer">
                            <button class="main-button button-violet" @click="onConfirm">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import NoteForm from './NoteForm'

export default {
  name: 'AddNoteModal',
  props: {
    isModalActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
    },
    onConfirm () {
      this.$refs.noteForm.onConfirm()
    }
  },
  components: {
    NoteForm
  }
}
</script>
