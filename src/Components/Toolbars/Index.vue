<template>
    <toolbar-main fixed :sidebar="false" :title="title">
        <template slot="toolbar-items">
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
