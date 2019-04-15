<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import { Dialog }            from '../Mixins/Dialog.vue';

    @Component
    export class DialogMain extends Mixins(Dialog)
    {

    }

    export default DialogMain;

</script>
