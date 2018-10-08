<script>

    /**
     * This mixins should be required by any component that extends the editor functionality.
     */
    export default {

        name: 'EditorCommand',

        props: {

            /**
             * TipTap marks.
             */
            marks: {
                required: true
            },

            /**
             * TipTap nodes.
             */
            nodes: {
                requred: true
            },

            /**
             * TipTap focus.
             */
            focus: {
                required: true
            }
        }
    }

</script>
