# Validator

The validator dictionary allows to change the error messages returned by the form validator.

The dictionary is defined in *resources/assets/js/App/Validator/Dictionary.js* and it follows the [same format](http://vee-validate.logaretm.com/rules.html#field-sepecific-messages) defined by [VeeValidate](http://vee-validate.logaretm.com).

For example:

    export default {
        en: {
            custom: {
                email: {
                    required: 'An email address is required.'
                },
                passwordConfirmation: {
                    required: 'The password confirmation is required.'
                }
            }
        }
    }