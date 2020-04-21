// Простой миксин для реализации возможности валидировать данные, описывая базовые правила валидации для отдельных полей
export default {
  data () {
    return {
      errors: {}
    }
  },
  methods: {
    addError (field, message) {
      // Метод добавления ошибки в объект
      // Если добавляемое поле уже содержиться в ошибках - добавляем в его массив ошибок - новую ошибку, передаем текст
      if (field in this.errors) {
        this.errors[field].push(message)
      } else {
        this.errors[field] = [message]
      }
    },
    validateData () {
      this.errors = {}

      // Перебираем свойства объекта validations у компонентов с формами
      for (const field in this.validations) {
        // Перебираем установленные правила для отдельных полей
        // Проверяем каждое поле на соответствие установленных правил, в случае ошибки - добавляем в массив ошибок методом addError
        for (const rule in this.validations[field]) {
          // Если правило имеет ключ required - проверяем поле на то, чтобы он не был пустым
          if (rule === 'required' && this.validations[field][rule]) {
            if (this[field] === '') {
              this.addError(field, `Поле "${this.validations[field].name}" обязательное для заполнения`)
            }
          }

          // Если ключ minLength - проверяем поле на то, чтобы количество символов было не меньше установленного значения
          if (rule === 'minLength') {
            if (this[field].length < this.validations[field][rule]) {
              this.addError(field, `Поле "${this.validations[field].name}" должно содержать минимум ${this.validations[field][rule]} символов`)
            }
          }

          // Если ключ maxLength - проверяем поле на то, чтобы количество символов не привышало установленного значения
          if (rule === 'maxLength') {
            if (this[field].length > this.validations[field][rule]) {
              this.addError(field, `Поле "${this.validations[field].name}" не должно содержать больше ${this.validations[field][rule]} символов`)
            }
          }

          // Если ключ minArrayLength - проверяем поле на то, чтобы количество элементов в массиве было не меньше установленного правила
          if (rule === 'minArrayLength') {
            if (this[field].length < this.validations[field][rule]) {
              this.addError(field, `В списке "${this.validations[field].name}" не должно быть меньше ${this.validations[field][rule]} элементов`)
            }
          }

          // Если ключ maxArrayLength - проверяем поле на то, чтобы количество элементов в массиве было не больше установленного правила
          if (rule === 'maxArrayLength') {
            if (this[field].length > this.validations[field][rule]) {
              this.addError(field, `В списке "${this.validations[field].name}" не должно быть больше ${this.validations[field][rule]} элементов`)
            }
          }

          // Если ключ maxArrayLength - проверяем у каждого элемента массива - поля, на то, чтобы не были пустыми
          if (rule === 'arrayFieldsRequired') {
            this[field].forEach((el) => {
              for (const key in el) {
                if (el[key] === '') {
                  this.addError(field, `Поля списке "${this.validations[field].name}" обязательны для заполнения`)
                  break
                }
              }
            })
          }
        }
      }

      // По завершению всех операции - возвращаем объект с ошибками, тем самым мы удобно проверяем поля на валидность
      return this.errors
    }
  }
}
