<script lang="ts">

export default {

    name: 'ToolbarGroup',

    props: {
        /**
         * Display smaller buttons.
         */
        small: { type: Boolean, default: false }
    },

    computed: {

        buttonProps()
        {
            return {
                small: this.small
            }
        }
    }
}

</script>
