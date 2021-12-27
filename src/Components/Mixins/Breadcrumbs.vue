<script lang="ts">

export default {

    props: {
        /**
         * An array containing the items that will be displayed.
         */
        items: { type: Array, default: () => ([]) },

        /**
         * Specifies the dividing character.
         */
        divider: { type: String, default: '/' }
    }
}

</script>
