<template>
    <v-menu v-bind="$props" ref="dateMenu" v-model="dateMenu" offset-y max-width="290px"
            :close-on-content-click="false" min-width="290px">
        <template #activator="{ on }">
            <text-field-main v-bind="$props" :value="textFieldDateTime" v-on="on" readonly
                             @input="handleInput"/>
        </template>
        <v-stepper v-model="stepperStep">
            <v-stepper-items>
                <v-stepper-content step="1" class="pa-0">
                    <v-date-picker v-model="date" no-title :allowed-dates="_allowedDates"
                                   @input="stepperStep++"/>
                </v-stepper-content>
                <v-stepper-content step="2" class="pa-0">
                    <v-time-picker v-model="time" format="24hr" ref="timePicker"
                                   :allowed-hours="allowedHours" :allowed-minutes="allowedMinutes"
                                   @click:minute="handleTimePickerClickMinute"/>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-menu>
</template>

<script lang="ts">

import DayJS from 'dayjs';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import TextFieldMain from './Main.vue';

@Component
export class TextFieldDateTime extends Mixins(TextFieldMain)
{
    /**
     * Specify the allowed dates.
     */
    @Prop({ type: Function }) allowedDates: (value: any) => boolean

    partialHour: number;

    date: string = '';

    dateMenu: boolean = false;

    time: string = '';

    stepperStep: string = '1';

    get textFieldDateTime(): string
    {
        if (! this.dateTime.length) {
            return '';
        }

        let string = '';

        if (this.date) {
            string += (this.$options.filters as any).readableDate(this.date);
        }

        if (this.time) {
            string += ' at ' + this.time;
        }

        return string;
    }

    get dateTime(): string
    {
        let string = '';

        if (this.date) {
            string += this.date;
        }

        if (this.time) {

            if (this.date) {
                string += ' ';
            }

            string += this.time + ':00';
        }

        return string;
    }

    /**
     * Specify the allowed dates.
     */
    _allowedDates(value: any): boolean
    {
        if (this.allowedDates) {
            return this.allowedDates(value);
        }

        return DayJS(value).isSameOrAfter(DayJS().startOf('day'));
    }

    allowedHours(value: any): boolean
    {
        if (! this.date) {
            return false;
        }

        if (DayJS(this.date).isSame(DayJS(), 'date')) {
            return value >= DayJS().hour();
        }

        return true;
    }

    allowedMinutes(value: any): boolean
    {
        if (! this.date && ! this.partialHour) {
            return false;
        }

        if (
            DayJS(this.date).isSame(DayJS(), 'date') &&
            this.partialHour === DayJS(DayJS()).hour()
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
        this.dateMenu = false;
    }

    setPartialHour(value: number)
    {
        this.partialHour = value;
    }

    @Watch('date')
    onDateUpdate(): void
    {
        this.$emit('input', this.dateTime);
    }

    @Watch('dateMenu')
    onDateMenuUpdate(): void
    {
        if (! this.dateMenu) {
            this.stepperStep = '1';
        }
    }

    @Watch('time')
    onTimeUpdate(): void
    {
        this.$emit('input', this.dateTime);
    }

    @Watch('value', { immediate: true })
    onValueChange(): void
    {
        let result = /(\d{4}-[01]\d-[0-3]\d) ([0-2]\d:[0-5]\d):[0-5]\d/.exec(this.value);

        if (! result) {
            return;
        }

        if (result[1]) {
            this.date = result[1];
        }

        if (result[2]) {
            this.time = result[2];
        }
    }
}

export default TextFieldDateTime;

</script>
