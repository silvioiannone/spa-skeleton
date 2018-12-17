<template>
    <error>
        <v-container class="mt-5">
            <v-layout>
                <v-flex xs12>
                    <div class="text-xs-center mb-5">
                        <v-icon x-large>error_outline</v-icon>
                    </div>
                    <h1 class="text-xs-center">{{ $t('misc.pageNotFound') }}</h1>
                </v-flex>
            </v-layout>
        </v-container>
    </error>
</template>

<script>

    import Error from "./Main.vue";

    export default
    {
        name: 'ErrorNotFound',

        components: {
            Error
        }
    }

</script>
