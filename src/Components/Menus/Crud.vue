<template>
    <v-menu>
        <template #activator="data">
            <v-btn icon v-on="data.on">
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

    import { Component, Prop, Vue } from 'vue-property-decorator';

    interface Resource {
        id: string;
    }

    @Component
    export class MenuCrud extends Vue
    {
        /**
         * Resource.
         */
        @Prop({ type: Object }) resource: Resource|undefined;

        /**
         * Resource prefix.
         */
        @Prop({ type: String }) prefix: string|undefined;

        get deleteTileProps(): any
        {
            let props: any = {};

            if (this.resource && this.prefix) {
                props.to = `${this.prefix}/${this.resource.id}/delete`;
            }

            return props;
        }

        get updateTileProps(): any
        {
            let props: any = {};

            if (this.resource && this.prefix) {
                props.to = `${this.prefix}/${this.resource.id}/update`;
            }

            return props;
        }

        /**
         * Handle the `click` event on the delete tile.
         */
        handleDeleteTileClick(): void
        {
            this.$emit('click:delete');
        }

        /**
         * Handle the `click` event on the update tile.
         */
        handleUpdateTileClick(): void
        {
            this.$emit('click:update');
        }
    }

    export default MenuCrud;

</script>
