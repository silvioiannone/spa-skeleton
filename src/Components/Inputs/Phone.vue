<template>
    <v-input>
        <v-layout>
            <v-flex xs3 @keydown.enter="stopEnterPropagation">
                <v-autocomplete :items="countryPhonePrefixes" v-model="countryPrefix"
                                item-value="prefix" :filter="filter" :disabled="disabled">
                    <template slot="item" slot-scope="props">
                        <v-list-tile-avatar>
                            <span :class="'flag-icon flag-icon-' + props.item.iso"></span>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ props.item.name }}
                                (<strong>+{{ props.item.prefix }}</strong>)
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </template>
                    <template slot="selection" slot-scope="props">
                        <strong>+{{ props.item.prefix }}</strong>
                    </template>
                </v-autocomplete>
            </v-flex>
            <v-flex xs9>
                <v-text-field label="Phone" v-model="phoneNumber" :disabled="! countryPrefix || disabled"
                              name="phone" :error-messages="errorMessages" :required="required"
                              :hint="hint" :persistent-hint="persistentHint"
                              :label="label"
                              :mask="selectedCountryPhonePrefix && selectedCountryPhonePrefix.mask || ''">
                </v-text-field>
            </v-flex>
        </v-layout>
    </v-input>
</template>

<script>

    import { parseNumber } from 'libphonenumber-js';
    import CountryPhonePrefixes from '../../Assets/Json/CountryPhonePrefixes.json';
    import MixinInput from '../Mixins/Input';

    export default {

        name: 'InputPhone',

        mixins: [
            MixinInput
        ],

        data()
        {
            return {
                countryPhonePrefixes: CountryPhonePrefixes,
                phoneNumber: '',
                countryPrefix: '',
                isInitialized: false
            }
        },

        props: {

            /**
             * Name of the input element.
             */
            name: {
                type: String,
                default: 'phone'
            },

            /**
             * Name of the input element.
             */
            label: {
                type: String,
                default: 'Phone'
            },

            /**
             * Make the phone input required.
             */
            required: {
                type: Boolean,
                default: false
            }
        },

        computed: {

            selectedCountryPhonePrefix()
            {
                return this.countryPhonePrefixes.find(item => item.prefix === this.countryPrefix);
            },

            e164FormattedNumber()
            {
                return '+' + this.countryPrefix + this.phoneNumber;
            }
        },

        methods: {

            /**
             * Filter the autocomplete items when typing.
             *
             * @param item
             * @param queryText
             * @param itemText
             * @returns {boolean}
             */
            filter(item, queryText, itemText)
            {
                const textOne = item.name.toLowerCase();
                const textTwo = '+' + item.prefix.toLowerCase();
                const searchText = queryText.toLowerCase();

                return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
            },

            /**
             * Init the phone number.
             */
            init()
            {
                if (! this.value) {
                    this.phoneNumber = '';
                    this.countryPrefix = '';
                    this.isInitialized = false;
                    return;
                }

                if (this.isInitialized) {
                    return;
                }

                let parsedNumber = parseNumber(this.value, '', { extended: true });

                if (! parsedNumber.countryCallingCode) {
                    return;
                }

                this.countryPrefix = this.countryPhonePrefixes
                    .find(item => item.prefix === parsedNumber.countryCallingCode.toString())
                    .prefix;
                this.phoneNumber = parsedNumber.phone;
                this.isInitialized = true;
            },

            /**
             * Stop the propagation of the enter keypress event.
             *
             * This is needed in order to avoid accidentally submitting the form containing this
             * input element.
             *
             * @param event
             */
            stopEnterPropagation(event)
            {
                event.preventDefault();
            }
        },

        watch: {

            e164FormattedNumber()
            {
                this.$emit('input', this.e164FormattedNumber);
            },

            value()
            {
                this.init();
            }
        },

        created()
        {
            this.init();
        }
    }

</script>