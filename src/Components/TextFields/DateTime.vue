<template>
    <v-menu v-bind="$props" v-on="$listeners" ref="remindDateMenu" v-model="remindDateMenu" offset-y
            max-width="290px" :close-on-content-click="false" minx-width="290px">
        <template #activator="{ on }">
            <text-field-main v-bind="$props" :value="textFieldRemindDateTime" v-on="on"/>
        </template>
        <v-stepper v-model="stepperStep">
            <v-stepper-items>
                <v-stepper-content step="1" class="pa-0">
                    <v-date-picker v-model="remindDate" no-title @input="stepperStep++"
                                   :allowed-dates="allowedDates"/>
                </v-stepper-content>
                <v-stepper-content step="2" class="pa-0">
                    <v-time-picker v-model="remindTime" format="24hr" ref="timePicker"
                                   @click:minute="handleTimePickerClickMinute"
                                   :allowed-hours="allowedHours" :allowed-minutes="allowedMinutes"/>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-menu>
</template>

<script lang="ts">

    import DayJS from 'moment';
    import { Component, Mixins, Watch } from 'vue-property-decorator';
    import { TextFieldMain }  from './Main.vue';

    @Component
    export class TextFieldDateTime extends Mixins(TextFieldMain)
    {
        partialHour: number;

        remindDate: string = '';

        remindDateMenu: boolean = false;

        remindTime: string = '';

        stepperStep: string = '1';

        get textFieldRemindDateTime(): string
        {
            if (! this.remindDateTime.length) {
                return '';
            }

            let string = '';

            if (this.remindDate) {
                string += (this.$options.filters as any).readableDate(this.remindDate);
            }

            if (this.remindTime) {
                string += ' at ' + this.remindTime;
            }

            return string;
        }

        get remindDateTime(): string
        {
            let string = '';

            if (this.remindDate) {
                string += this.remindDate;
            }

            if (this.remindTime) {

                if (this.remindDate) {
                    string += ' ';
                }

                string += this.remindTime + ':00';
            }

            return string;
        }

        allowedDates(value: any): boolean
        {
            return DayJS(value).isSameOrAfter(DayJS().startOf('day'));
        }

        allowedHours(value: any): boolean
        {
            if (! this.remindDate) {
                return false;
            }

            if (DayJS(this.remindDate).isSame(DayJS.now(), 'date')) {
                return value >= DayJS().hour();
            }

            return true;
        }

        allowedMinutes(value: any): boolean
        {
            if (! this.remindDate && ! this.partialHour) {
                return false;
            }

            if (
                DayJS(this.remindDate).isSame(DayJS.now(), 'date') &&
                this.partialHour === DayJS(DayJS.now()).hour()
            ) {
                return value > DayJS().minute();
            }

            return true;
        }

        handleTimePickerClickMinute(): void
        {
            setTimeout(() => {
                (this.$refs.timePicker as any).selecting = 1;
            });

            this.stepperStep = '1';
            this.remindDateMenu = false;
        }

        setPartialHour(value: number)
        {
            this.partialHour = value;
        }

        @Watch('remindDate')
        onRemindDateUpdate(): void
        {
            this.$emit('input', this.remindDateTime);
        }

        @Watch('remindDateMenu')
        onRemindDateMenuUpdate(): void
        {
            if (! this.remindDateMenu) {
                this.stepperStep = '1';
            }
        }

        @Watch('remindTime')
        onRemindTimeUpdate(): void
        {
            this.$emit('input', this.remindDateTime);
        }

        @Watch('value', { immediate: true })
        onValueChange(): void
        {
            let result = /(\d{4}-[01]\d-[0-3]\d) ([0-2]\d:[0-5]\d):[0-5]\d/.exec(this.value);

            if (! result) {
                return;
            }

            if (result[1]) {
                this.remindDate = result[1];
            }

            if (result[2]) {
                this.remindTime = result[2];
            }
        }
    }

    export default TextFieldDateTime;

</script>
