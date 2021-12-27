<template>
    <v-alert v-bind="props" v-on="$listeners">
        <slot/>
    </v-alert>
</template>

<script lang="ts">

export default {

    name: 'AlertMain',

    inheritAttrs: false,

    computed: {
        props(): any
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
}

</script>
