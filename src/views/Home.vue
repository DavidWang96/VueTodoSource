<template>
  <div class="home-page">
    <div class="notes">
      <div class="note" v-for="(note, noteIndex) in notes" :key="noteIndex">
        <div class="note__header">
          <p class="note__title">{{ note.name }}</p>
          <div class="note__remove" @click="removeNote(note.id)">&nbsp;</div>
        </div>
        <div class="note__todo" :class="{'many': note.todo.length > 4}">
          <div class="todo-item" v-for="(item, todoIndex) in note.todo" :class="{'completed': item.isComplete}" :key="todoIndex">
            <div class="todo-item__checkbox">
              <div class="main-checkbox">
                <label>
                  <input type="checkbox" :checked="item.isComplete" disabled>
                  <span class="checkmark">&#10003;</span>
                </label>
              </div>
            </div>
            <p class="todo-item__name">{{ item.taskDescription }}</p>
          </div>
        </div>
        <div class="note__edit">
          <router-link :to="{path: '/edit/' + note.id}" class="main-button button-violet">
            Изменить заметку
          </router-link>
        </div>
      </div>
    </div>

    <div class="add-note">
      <button class="main-button button-violet" @click="addNoteModalActive = true">
        <span>+</span> Добавить новую заметку
      </button>
    </div>

    <add-note-modal :is-modal-active="addNoteModalActive" @closeModal="addNoteModalActive = false"></add-note-modal>
  </div>
</template>

<script>
import AddNoteModal from '../components/AddNoteModal'

export default {
  name: 'Home',
  data () {
    return {
      addNoteModalActive: false
    }
  },
  methods: {
    removeNote (id) {
      // Находим заметку по ID
      const item = this.notes.find(item => item.id === id)

      // Вызываем окно подтверждения
      this.modalConfirm(`Вы уверены что хотите удалить заметку ${item.name} ?`)
        .then(() => {
          // Если пользователь подтвердил
          this.changeStoreState('removeNote', item.id)
        })
        .catch(() => {
          return false
        })
    },
    addNote () {
      this.addNoteModalActive = true
    }
  },
  computed: {
    notes () {
      return this.$store.getters.getAllNodes
    }
  },
  components: {
    AddNoteModal
  },
  watch: {
    addNoteModalActive () {
      // При изменении состояния модального окна - убираем или присваиваем класс у body
      this.addNoteModalActive ? document.body.className = 'is-modal-opened' : document.body.className = ''
    }
  }
}
</script>
