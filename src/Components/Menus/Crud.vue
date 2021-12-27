<template>
    <v-menu>
        <template #activator="data">
            <v-btn icon v-on="data.on" :small="small">
                <v-icon>more_vert</v-icon>
            </v-btn>
        </template>
        <v-list>
            <slot/>
            <v-list-item v-bind="updateTileProps" @click.stop="handleUpdateTileClick">
                <v-list-item-avatar>
                    <v-icon>edit</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{ $t('actions.update') }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-bind="deleteTileProps" @click.stop="handleDeleteTileClick">
                <v-list-item-avatar>
                    <v-icon color="red">delete</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{ $t('actions.delete') }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts">

interface Resource {
    id: string;
}

export default {

    name: 'MenuCrud',

    props: {
        /**
         * Resource prefix.
         */
        prefix: { type: String },

        /**
         * Make the button small.
         */
        small: { type: Boolean, default: false },

        /**
         * Resource.
         */
        resource: { type: Object }
    },

    computed: {
        deleteTileProps(): any
        {
            let props: any = {};

            if (this.resource && this.prefix) {
                props.to = `${this.prefix}/${this.resource.id}/delete`;
            }

            return props;
        },

        updateTileProps(): any
        {
            let props: any = {};

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
        handleDeleteTileClick(): void
        {
            this.$emit('click:delete');
        },

        /**
         * Handle the `click` event on the update tile.
         */
        handleUpdateTileClick(): void
        {
            this.$emit('click:update');
        }
    }
}

</script>
