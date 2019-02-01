<template>
    <error :back-button="false">
        <v-container class="mt-5">
            <v-layout wrap>
                <v-flex xs12>
                    <div class="text-xs-center mb-5">
                        <v-icon x-large class="red--text">error_outline</v-icon>
                    </div>
                    <h3 class="text-xs-center">{{ $t('common.unauthorized') }}</h3>
                </v-flex>
                <v-flex xs12 offset-md3 md6 offset-lg4 lg4 class="mt-5">
                    <v-card>
                        <v-alert icon="warning" color="warning" :value="true">
                            {{ $t('views.errors.youAreNotAuthorizedToViewThisPage') }}
                            {{ $t('views.errors.authenticateInOrderToContinue') }}
                        </v-alert>
                        <slot></slot>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </error>
</template>

<script>

    import Error from "./Main.vue";

    export default {

        name: 'ErrorUnauthorized',

        components: {
            Error
        }
    }

</script>
