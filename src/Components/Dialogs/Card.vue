<template>
    <dialog-main v-bind="getProps()" v-on="getOn()">
        <v-card>
            <v-card-title class="headline">{{ this.title }}</v-card-title>
            <v-card-text>
                <slot></slot>
            </v-card-text>
        </v-card>
    </dialog-main>
</template>

<script>

    import MixinWrapper from '../Mixins/Wrapper';
    import DialogMain from './Main';

    export default {

        name: 'DialogCard',

        mixins: [
            MixinWrapper
        ],

        components: {
            DialogMain
        },

        props: {

            /**
             * Dialog title.
             */
            title: {
                tye: String,
                default: ''
            }
        },

        data()
        {
            return {
                __component: DialogMain
            }
        }
    }

</script>
