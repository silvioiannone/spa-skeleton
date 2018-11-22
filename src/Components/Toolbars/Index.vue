<template>
    <toolbar-main fixed :sidebar="false" :title="title" :color="color">
        <slot slot="title" name="title"></slot>
        <slot slot="toolbar-text" class="v-toolbar__text" name="toolbar-text"></slot>
        <slot slot="toolbar-text-right" class="v-toolbar__text" name="toolbar-text-right"></slot>
        <template slot="toolbar-items">
            <slot></slot>
            <v-btn flat to="/login">{{ $t('toolbar.logIn') }}</v-btn>
        </template>
    </toolbar-main>
</template>

<script>

    export default
    {
        name : 'ToolbarIndex',

        props: {

            /**
             * Toolbar's color.
             */
            color: {
                type: String,
                default: ''
            },

            /**
             * Toolbar's title.
             */
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>
