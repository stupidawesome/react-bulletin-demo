export default class FormControlModel {

  static REQUIRED = {
    name: 'required',
    exec: function required (value) {
      return value === null || value === undefined || value === ''
    }
  };

  constructor (formGroups) {
    this.formGroups = formGroups
    this.submitted = false

    formGroups.forEach((formGroup) => {
      this[formGroup.name] = formGroup
    })
  }

  isValid () {
    return this.formGroups.every((formGroup) => {
      return formGroup.valid
    })
  }

  getValue () {
    return this.formGroups.reduce((value, formGroup) => {
      return Object.assign(value, {[formGroup.name]: formGroup.modelValue})
    }, {})
  }

  setValue (value) {
    this.formGroups.forEach((formGroup) => {
      if (formGroup) {
        formGroup.setViewValue(value[formGroup.name] === undefined ? '' : value[formGroup.name])
      }
    })
  }

  patchValue (value) {
    Object.keys(value).forEach((key) => {
      const formGroup = this[key]
      if (formGroup) {
        formGroup.setViewValue(value[key])
      }
    })
  }

  setSubmitted (submitted) {
    this.submitted = arguments.length > 0 ? !!submitted : true
    if (this.submitted) {
      this.formGroups.forEach((formGroup) => {
        formGroup.setPristine(false)
        formGroup.validate(false)
      })
    }
  }
}
