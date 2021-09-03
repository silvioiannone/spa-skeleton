<template>
    <v-alert v-bind="props" v-on="$listeners">
        <slot/>
    </v-alert>
</template>

<script lang="ts">

    import { Vue, Component, Prop} from 'vue-property-decorator';

    @Component({
        inheritAttrs: false
    })
    export class AlertMain extends Vue
    {
        get props(): any
        {
            if (this.$attrs.type === 'info') {
                this.$attrs.color = 'primary';
            }

            return {
                ...this.$attrs,
                ...this.$props
            }
        }
    }

    export default AlertMain;

</script>
