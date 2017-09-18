let id = 0
export default class FormGroupModel {

  get modelValue () {
    return this.$modelValue
  }

  set modelValue (value) {
    this.$modelValue = value
  }

  get viewValue () {
    return this.$viewValue
  }

  set viewValue (value) {
    this.setPristine(this.pristine && this.$viewValue === value)
    this.$viewValue = value
    this.$modelValue = value
    this.validate()
  }

  constructor (name, value, validators) {
    this.id = name + id++
    this.name = name
    this.validators = validators
    this.$viewValue = value
    this.$modelValue = value
    this.dirty = false
    this.pristine = true
    this.untouched = true
    this.touched = false
    this.valid = false
    this.invalid = true
    this.errors = {}
  }

  validate () {
    return this.validators
      .filter((validator) => {
        return this.setValidity(validator.name, validator.exec(this.viewValue))
      }).length === 0
  }

  setViewValue (value) {
    this.viewValue = value
  }

  setPristine (pristine) {
    this.pristine = arguments.length > 0 ? !!pristine : true
    this.dirty = !this.pristine
  }

  setTouched (touched) {
    this.touched = arguments.length > 0 ? !!touched : true
    this.untouched = !this.touched
  }

  setValidity (name, value) {
    this.errors[name] = value
    this.invalid = Object.keys(this.errors).some((key) => this.errors[key])
    this.valid = !this.invalid
    return value
  }
}
