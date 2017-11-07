<template>
    <toolbar-main fixed :sidebar="false">
        <template slot="toolbar-items">
            <v-btn flat to="/login">Log in</v-btn>
        </template>
    </toolbar-main>
</template>

<script>
    
    export default
    {
        name : 'ToolbarIndex'
    }
</script>