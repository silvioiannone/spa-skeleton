<template>
    <v-menu>
        <tempalte #activator="data">
            <v-btn icon v-on="data.on">
                <v-icon>more_vert</v-icon>
            </v-btn>
        </tempalte>
        <v-list>
            <v-list-tile v-bind="deleteTileProps" @click.stop="handleDeleteTileClick">
                <v-list-tile-avatar>
                    <v-icon color="red">delete</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{ $t('common.delete') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-bind="updateTileProps" @click.stop="handleUpdateTileClick">
                <v-list-tile-avatar>
                    <v-icon>edit</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{ $t('common.update') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>

<script>

    export default {

        name: 'MenuCrud',

        props: {

            /**
             * Resource.
             */
            resource: {
                type: Object
            },

            /**
             * Resource prefix.
             */
            prefix: {
                type: String
            }
        },

        computed: {

            deleteTileProps()
            {
                let props = {};

                if (this.resource && this.prefix) {
                    props.to = `${this.prefix}/${this.resource.id}/delete`;
                }

                return props;
            },

            updateTileProps()
            {
                let props = {};

                if (this.resource && this.prefix) {
                    props.to = `${this.prefix}/${this.resource.id}/update`;
                }

                return props;
            }
        },

        methods: {

            /**
             * Handle the `click` event on the delete tile.
             */
            handleDeleteTileClick()
            {
                this.$emit('click:delete');
            },

            /**
             * Handle the `click` event on the update tile.
             */
            handleUpdateTileClick()
            {
                this.$emit('click:update');
            }
        }
    }

</script>
