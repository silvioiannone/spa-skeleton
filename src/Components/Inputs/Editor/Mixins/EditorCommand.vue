<script>

    /**
     * This mixins should be required by any component that extends the editor functionality.
     */
    export default {

        name: 'EditorCommand',

        props: {

            /**
             * TipTap editor commands prop.
             */
            commands: {
                required: true
            },

            /**
             * TipTap editor isActive prop.
             */
            isActive: {
                requred: true
            }
        }
    }

</script>
