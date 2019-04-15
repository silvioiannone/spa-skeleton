<template>
    <v-input>
        <v-layout>
            <v-flex xs3 @keydown.enter="stopEnterPropagation">
                <v-autocomplete :items="countryPhonePrefixes" v-model="countryPrefix"
                                item-value="prefix" :filter="filter" :disabled="disabled">
                    <template #item="props">
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
                    <template #selection="props">
                        <strong>+{{ props.item.prefix }}</strong>
                    </template>
                </v-autocomplete>
            </v-flex>
            <v-flex xs9>
                <v-text-field label="Phone" v-model="phoneNumber" name="phone" :required="required"
                              :disabled="! countryPrefix || disabled" :label="label" :hint="hint"
                              :error-messages="errorMessages" :persistent-hint="persistentHint"
                              :mask="selectedCountryPhonePrefix &&
                                     selectedCountryPhonePrefix.mask || ''">
                </v-text-field>
            </v-flex>
        </v-layout>
    </v-input>
</template>

<script lang="ts">

    import { Component, Mixins, Prop, Watch }  from 'vue-property-decorator';
    import { parseNumber }                     from 'libphonenumber-js';
    import CountryPhonePrefixes                from '../../Assets/Json/CountryPhonePrefixes.json';
    import { Input }                           from '../Mixins/Input.vue';

    interface PrefixDescription {
        name: string,
        iso: string,
        prefix: string
    }

    @Component
    export class InputPhone extends Mixins(Input)
    {
        /**
         * Name of the input element.
         */
        @Prop({ type: String, default: 'phone' }) name: string;

        /**
         * Label of the input element.
         */
        @Prop({ type: String, default: 'Phone' }) label: string;

        /**
         * Make the phone input required.
         */
        @Prop({ type: Boolean, default: false }) required: boolean;

        countryPhonePrefixes: Array<PrefixDescription> = CountryPhonePrefixes || [];

        phoneNumber: string = '';

        countryPrefix: string = '';

        get selectedCountryPhonePrefix()
        {
            return this.countryPhonePrefixes
                .find((item: PrefixDescription) => item.prefix === this.countryPrefix);
        }

        get e164FormattedNumber(): string
        {
            return '+' + this.countryPrefix + this.phoneNumber;
        }

        /**
         * Filter the autocomplete items when typing.
         */
        filter(item: PrefixDescription, queryText: string, itemText: string): boolean
        {
            const textOne = item.name.toLowerCase();
            const textTwo = '+' + item.prefix.toLowerCase();
            const searchText = queryText.toLowerCase();

            return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
        }

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

            if (! parsedNumber.countryCallingCode && ! this.countryPrefix.length) {
                // If the parsed number doesn't have any country calling code but the value is still
                // set then assume that the value only contains the country calling code and assign
                // it to the country prefix.
                this.countryPrefix = this.value.slice(1, this.value.length);
                return;
            }

            let countryPhonePrefix = this.countryPhonePrefixes
                .find((item: PrefixDescription) =>
                {
                    if (! parsedNumber.countryCallingCode) {
                        return false;
                    }

                    return item.prefix === parsedNumber.countryCallingCode.toString()
                });

            if (countryPhonePrefix) {
                this.countryPrefix = countryPhonePrefix.prefix;
            }

            if (parsedNumber.phone) {
                this.phoneNumber = parsedNumber.phone.toString();
            }
        }

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

        @Watch('e164FormattedNumber')
        onE164FormattedNumberChange()
        {
            this.$emit('input', this.e164FormattedNumber);
        }

        @Watch('value', { immediate: true })
        onValueChange()
        {
            this.init();
        }
    }

    export default InputPhone;

</script>
