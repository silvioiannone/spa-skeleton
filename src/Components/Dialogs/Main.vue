<script lang="ts">

    import '../../../../vuetify/src/components/VDialog/VDialog.sass';

    import { Component, Mixins } from 'vue-property-decorator';
    import { Dialog }            from '../Mixins/Dialog.vue';

    @Component
    export class DialogMain extends Mixins(Dialog)
    {

    }

    export default DialogMain;

</script>
