<template>
    <toolbar-main fixed :sidebar="false" :title="title">
        <div slot="toolbar-text" class="toolbar__text">
            <slot name="toolbar-text"></slot>
        </div>
        <template slot="toolbar-items">
            <slot></slot>
            <v-btn flat to="/login">Log in</v-btn>
        </template>
    </toolbar-main>
</template>

<script>

    export default
    {
        name : 'ToolbarIndex',

        props: {

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
