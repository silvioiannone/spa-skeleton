<script>

    /**
     * This mixin provides simple access to the user related data.
     */
    export default {

        computed: {

            user()
            {
                return this.$store.getters.app.user;
            }
        },

        methods: {

            /**
             * Check that the user has a specific role.
             *
             * @param role {String}
             * @returns {boolean}
             */
            userHasRole(role)
            {
                return this.user.role.name === role;
            }
        }
    }

</script>
