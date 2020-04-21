<template>
    <div>
        <form class="main-form" @submit.prevent="onConfirm">
            <div class="form-control" :class="{'is-error': 'noteName' in errors}">
                <label for="note-name">Название заметки</label>
                <input type="text" id="note-name" v-model="noteName">
            </div>

            <p class="main-form__title">Список задач</p>

            <div class="form-todo">
                <div class="todo-item" :class="{'completed': item.isComplete}" v-for="(item, index) in todo"
                     :key="index">
                    <div class="todo-item__checkbox">
                        <div class="main-checkbox">
                            <label>
                                <input type="checkbox" v-model="item.isComplete">
                                <span class="checkmark">&#10003;</span>
                            </label>
                        </div>
                    </div>
                    <div class="todo-item__name"
                         :class="{'is-error' : Object.keys(errors).length > 0 && item.taskDescription === ''}">
                        <input type="text" v-model=item.taskDescription>
                    </div>
                    <div class="todo-item__remove" @click="todo.splice(index, 1)">
                        <span>&nbsp;</span>
                    </div>
                </div>
            </div>

            <div class="add-todo-item">
                <span class="main-button button-violet small" @click="addTodoItem"><span>+</span> Добавить задачу</span>
            </div>
        </form>

        <div class="form-errors" v-if="Object.keys(errors).length > 0">
            <p class="form-errors__title">Ошибки:<p/>

            <ul v-for="(field, index) in errors" :key="index">
                <li v-for="(err, index) in field" :key="index">{{ err }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NoteForm',
  props: {
    id: {
      type: Number,
      default: NaN
    }
  },
  data () {
    return {
      noteName: '',
      todo: [
        {
          taskDescription: 'New Task',
          isComplete: false
        }
      ],
      validations: {
        noteName: {
          name: 'Название заметки',
          required: true,
          maxLength: 255
        },
        todo: {
          name: 'Задачи',
          minArrayLength: 1,
          maxArrayLength: 30,
          arrayFieldsRequired: true
        }
      }
    }
  },
  created () {
    // Эта универсальная форма для добавления новой записи или редактирования старой
    // Если в форму передан ID - получаем запись из Store по ID
    if (!isNaN(this.id)) {
      this.getNoteById(this.id)
    }
  },
  computed: {
    cachedNote () {
      // Возвращаем отдельное состояние записи, сохраненное в отдельном объекте Store
      // Для реализации возможности вернуть утерянные изменения
      return this.$store.getters.getCachedNode
    }
  },
  methods: {
    getNoteById (id) {
      // Метод получения записи по ID, если этот ID передан в форму
      const storeNote = this.$store.getters.getNoteById(id)

      // Меняем состояние формы в соответствии с полученными данными
      this.noteName = storeNote.name
      this.todo = storeNote.todo
    },
    addTodoItem () {
      // Добавление новой задачи
      this.todo.push({
        taskDescription: 'New Task',
        isComplete: false
      })
    },
    loadCached () {
      // Загрузка сброшенных изменений в случаи нажания на кнопку "повторить отмененное изменение"
      // Проверяем равенство ID "Закешированной записи" с той записью, с которой работаем в данный момент
      if (this.cachedNote.id === this.id) {
        this.noteName = this.cachedNote.name
        this.todo = this.cachedNote.todo
      }
    },
    cancelChanges () {
      // В случае нажатия кнопки "Отменить внесенные изменения" - создаем копию состояния
      // и заносим в отдельное поле Store
      const dataToCache = JSON.parse(JSON.stringify({
        id: this.id,
        name: this.noteName,
        todo: this.todo
      }))

      this.changeStoreState('cacheChanges', dataToCache)
      this.getNoteById(this.id)
    },
    onConfirm () {
      // При сохранении - проверяем поля на валидность, правила описаны в объекте validations
      this.validateData()

      // Если ошибок нет - проверяем существования ID переданной в форму, в зависимости от того - есть он или нет
      // Мы создаем новый элемент и отправляем в хранилище, или изменяем существующий, по этому ID
      if (!this.errors.noteName && !this.errors.todo) {
        if (!isNaN(this.id)) {
          this.changeStoreState('updateNote', {
            id: this.id,
            name: this.noteName,
            todo: this.todo
          })

          this.$router.push('/')
        } else {
          this.changeStoreState('addNote', {
            name: this.noteName,
            todo: this.todo
          })

          this.noteName = ''
          this.todo = []

          this.$emit('formConfirmed')
        }
      }
    }
  }
}
</script>
