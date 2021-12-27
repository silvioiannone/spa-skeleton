<template>
    <v-row>
        <v-col xl="3" @keydown.enter="stopEnterPropagation">
            <v-autocomplete :items="countryPhonePrefixes" v-model="countryPrefix"
                            :outlined="_outlined" item-value="prefix" :filter="filter"
                            :disabled="disabled">
                <template #item="props">
                    <v-list-item-avatar>
                        <span :class="'flag-icon flag-icon-' + props.item.iso"/>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ props.item.name }}
                            (<strong>+{{ props.item.prefix }}</strong>)
                        </v-list-item-title>
                    </v-list-item-content>
                </template>
                <template #selection="props">
                    <strong>+{{ props.item.prefix }}</strong>
                </template>
            </v-autocomplete>
        </v-col>
        <v-col xl="9">
            <text-field-main :label="$t('common.phone')" v-model="phoneNumber" name="phone"
                             :hint="hint" :disabled="! countryPrefix || disabled"
                             :mask="selectedCountryPhonePrefix.mask" :rules="rules"/>
        </v-col>
    </v-row>
</template>

<script lang="ts">

import _ from 'lodash';
import { CountryCallingCode, parseNumber, ParsedNumber } from 'libphonenumber-js';
import { Config } from '../../Config';
import Input from '../Mixins/Input.vue';
import Validatable from '../Mixins/Components/Validatable.vue';
import CountryPhonePrefixes from '../../Assets/Json/CountryPhonePrefixes.json';

interface PrefixDescription {
    name: string,
    iso: string,
    prefix: string,
    mask?: string
}

export default {

    name: 'InputPhone',

    mixins: [Input, Validatable],

    data()
    {
        return {
            countryPhonePrefixes: CountryPhonePrefixes || [] as Array<PrefixDescription>,
            phoneNumber: '',
            countryPrefix: '',
            selectedCountryPhonePrefix: {
                name: '',
                iso: '',
                prefix: '',
                mask: '## ## ## ###'
            } as PrefixDescription
        }
    },

    computed: {
        _outlined(): boolean
        {
            return Config.ui.components.textField.defaultStyle === 'outlined';
        },

        e164FormattedNumber(): string
        {
            return '+' + this.countryPrefix + this.phoneNumber;
        }
    },

    methods: {
        /**
         * Filter the autocomplete items when typing.
         */
        filter(item: PrefixDescription, queryText: string, itemText: string): boolean
        {
            const textOne = item.name.toLowerCase();
            const textTwo = '+' + item.prefix.toLowerCase();
            const searchText = queryText.toLowerCase();

            return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
        },

        /**
         * Init the phone number.
         */
        init(): void
        {
            if (! this.value) {
                this.phoneNumber = '';
                this.countryPrefix = '';
                return;
            }

            // First try to parse the phone number and init the component data accordingly.
            let parsedNumber = parseNumber(this.value, { extended: true });

            if (_.isEmpty(parsedNumber)) {
                return;
            }

            if (! (parsedNumber as ParsedNumber).countryCallingCode &&
                ! (this.countryPrefix && this.countryPrefix.length)) {
                // If the parsed number doesn't have any country calling code, but the value is
                // still set then assume that the value only contains the country calling code and
                // assign it to the country prefix.
                this.countryPrefix = this.value.slice(1, this.value.length);
                return;
            }

            let countryPhonePrefix = this.countryPhonePrefixes
                .find((item: PrefixDescription) =>
                {
                    if (! (parsedNumber as ParsedNumber).countryCallingCode) {
                        return false;
                    }

                    return item.prefix === ((parsedNumber as ParsedNumber)
                        .countryCallingCode as CountryCallingCode)
                        .toString()
                });

            if (countryPhonePrefix) {
                this.countryPrefix = countryPhonePrefix.prefix;
            }

            if ((parsedNumber as ParsedNumber).phone) {
                this.phoneNumber = (parsedNumber as ParsedNumber).phone.toString();
            }
        },

        /**
         * Stop the propagation of the enter keypress event.
         *
         * This is needed in order to avoid accidentally submitting the form containing this
         * input element.
         */
        stopEnterPropagation(event: any)
        {
            event.preventDefault();
        }
    },

    mounted()
    {
        this.$watch('countryPrefix', () => {
            let result = this.countryPhonePrefixes
                .find((item: PrefixDescription) => item.prefix === this.countryPrefix);

            if (result) {
                this.selectedCountryPhonePrefix = result;
            }
        });

        this.$watch('value', () => {
            this.init();
        });
    },

    watch: {
        e164FormattedNumber() {
            this.$emit('input', this.e164FormattedNumber);
        }
    }
}

</script>
