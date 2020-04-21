<template>
    <div class="edit-note-page">

        <div class="page-form">
            <note-form :ref="'noteForm'" :id="noteId"></note-form>

            <div class="page-form__buttons">
                <div class="row">
                    <button class="main-button button-violet" @click="saveNote">Сохранить</button>
                    <button class="main-button button-red" @click="cancelEditing">Отменить редактирование</button>
                </div>

                <div class="row">
                    <a href="#" @click.prevent="cancelChanges">↶<span class="hidden-mobile"> Отменить внесенное изменение</span></a>
                    <a href="#" @click.prevent="redoChanges">↷<span class="hidden-mobile"> повторить отмененное изменение</span></a>
                    <a href="#" @click.prevent="removeNote">🗑<span class="hidden-mobile"> удалить</span></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NoteForm from '../components/NoteForm'

export default {
  methods: {
    redoChanges () {
      this.$refs.noteForm.loadCached()
    },
    saveNote () {
      this.$refs.noteForm.onConfirm()
    },
    cancelChanges () {
      this.$refs.noteForm.cancelChanges()
    },
    cancelEditing () {
      // При нажатии на кнопку отмены - вызываем окно подтверждения
      this.modalConfirm('Вы уверены что хотите отменить редактирование и вернуться обратно?')
        .then(() => {
          // Если пользователь подтвердил - возвращаемся на главную страницу, без изменений
          this.$router.push('/')
        })
        .catch(() => {
          return false
        })
    },
    removeNote () {
      // При нажатии на кнопку удаления - вызываем окно подтверждения
      this.modalConfirm('Вы уверены что хотите удалить эту заметку?')
        .then(() => {
          // Если пользователь подтверждает - вызываем мутацию removeNote у Store и передаем ID записи
          this.changeStoreState('removeNote', this.noteId)
          this.$router.push('/')
        })
        .catch(() => {
          return false
        })
    }
  },
  computed: {
    noteId () {
      // Получаем целочисленный ID из параметров текущего маршрута
      return Number(this.$route.params.id)
    }
  },
  components: {
    NoteForm
  }
}
</script>
