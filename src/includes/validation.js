import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'
export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('password_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded)
    // custom error messages
    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The ${ctx.field === 'user_type' ? 'user role' : ctx.field} is required.`,
          min: `The ${ctx.field} is too short.`,
          max: `The ${ctx.field} is too long.`,
          alpha_spaces: `The ${ctx.field} mayonly contains characters and spaces.`,
          email: `The ${ctx.field} must be a valid email.`,
          min_value: `The ${ctx.field} is too low.`,
          max_value: `The ${ctx.field} is too high.`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
          country_excluded: 'Due to restrictions, we do not accept users from this location.',
          password_mismatch: "The passwords do'nt match.",
          tos: 'you must accept the terms of services before proceeding.',
          user_type: 'The user role is required.'
        }
        const message = messages[ctx.rule.name] ?? `The field ${ctx.field} is invalid.`
        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: true,
      validateOnModelUpdate: true
    })
  }
}
