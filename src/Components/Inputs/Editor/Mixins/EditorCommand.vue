<script lang="ts">

/**
 * This mixin should be required by any component that extends the editor functionality.
 */
export default {

    name: 'EditorCommand',

    props: {

        /**
         * TipTap editor commands prop.
         */
        commands: { required: true },

        /**
         * TipTap editor isActive prop.
         */
        isActive: { required: true }
    }
}

</script>
