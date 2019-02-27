<template>
    <toolbar-main fixed :sidebar="false" :title="title" :color="color">
        <template #title>
            <slot name="title"></slot>
        </template>
        <template #toolbar-text>
            <slot class="v-toolbar__text" name="toolbar-text"></slot>
        </template>
        <template #toolbar-text-right>
            <slot class="v-toolbar__text" name="toolbar-text-right"></slot>
        </template>
        <template #toolbar-items>
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
