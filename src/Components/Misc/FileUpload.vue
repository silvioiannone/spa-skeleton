<template>
    <div>
        <vue-dropzone v-if="previewTemplate" ref="dropzone" id="dropzone" :options="dropzoneOptions"
                      :useCustomSlot=true class="dropzone" :include-styling="false"
                      v-on:vdropzone-thumbnail="generateThumbnail"
                      v-on:vdropzone-error="handleError" v-on:vdropzone-success="handleSuccess"
                      v-on:vdropzone-queue-complete="handleQueueComplete">
            <div>
                <h3>{{ $t('misc.fileUpload.dragAndDropToUploadAFile') }}</h3>
                <p>{{ $t('misc.fileUpload.orClickTapToSelectOne') }}</p>
            </div>
        </vue-dropzone>
        <v-alert type="error" :value="errorMessage.length" class="mt-3">{{ errorMessage }}</v-alert>
        <div class="mt-3">
            <v-btn color="primary" @click="upload" :loadinig="uploading">
                {{ $t('common.upload') }}
            </v-btn>
            <v-btn text @click="cancel">{{ $t('actions.cancel') }}</v-btn>
        </div>

        <!-- Template preview -->
        <div id="previewTemplate" v-show="false">
            <div class="dz-preview dz-file-preview xs12">
                <div class="dz-image">
                    <div data-dz-thumbnail-bg></div>
                </div>
                <div class="dz-details">
                    <div class="dz-size">
                        <span data-dz-size></span>
                    </div>
                    <div class="dz-filename">
                        <span data-dz-name></span>
                    </div>
                </div>
                <div class="dz-progress">
                    <span class="dz-upload" data-dz-uploadprogress></span>
                </div>
                <div class="dz-success-mark">
                    <i class="fa fa-check"></i>
                </div>
                <div class="dz-error-mark">
                    <i class="fa fa-close"></i>
                </div>
                <div class="d-flex justify-space-between">
                    <div class="d-flex align-center dz-size">
                        <div data-dz-size></div>
                    </div>
                    <div class="text-right">
                        <v-btn icon data-dz-remove>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Token }                from '../../Library/Api/Token';
    import VueDropzone              from 'vue2-dropzone';
    import 'vue2-dropzone/dist/vue2Dropzone.min.css';

    @Component({
        components: {
            VueDropzone
        }
    })
    export class FileUpload extends Vue
    {
        /**
         * Additional data to send to the server.
         */
        @Prop({ type: Object, default: () => ({}) }) data: any;

        /**
         * Dropzone options object that will be merged with the default one.
         */
        @Prop({ type: Object, default: () => ({}) }) options: any;

        errorMessage: string = '';
        previewTemplate: string|null = null;
        uploading: boolean = false;

        get config(): any
        {
            return this.$store.getters.app.config;
        }

        get dropzoneOptions(): any
        {
            return {
                autoProcessQueue: false,
                headers: {
                    Authorization: 'Bearer ' + Token.getAccessToken()
                },
                previewTemplate: this.previewTemplate,
                thumbnailHeight: null,
                thumbnailWidth: 640,
                url: '/api/v1/files',
                params: this.data,
                ...this.options,
            }
        }

        /**
         * Cancel the upload.
         */
        cancel(): void
        {
            this.$emit('cancel')
        }

        /**
         * Generate the thumbnail.
         *
         * @param file
         * @param dataUrl
         * @returns {number}
         */
        generateThumbnail(file: any, dataUrl: string)
        {
            let j: number, len: number, ref: any, thumbnailElement: any;

            if (file.previewElement) {
                file.previewElement.classList.remove("dz-file-preview");
                ref = file.previewElement.querySelectorAll("[data-dz-thumbnail-bg]");
                for (j = 0, len = ref.length; j < len; j++) {
                    thumbnailElement = ref[j];
                    thumbnailElement.alt = file.name;
                    thumbnailElement.style.backgroundImage = 'url("' + dataUrl + '")';
                }
                return setTimeout((() => file.previewElement.classList.add("dz-image-preview")), 1);
            }
        }

        /**
         * Handle the error event.
         */
        handleError(file: any, message: string, xhr: any)
        {
            if (! xhr) {
                return;
            }

            let response = JSON.parse(xhr.response);

            this.errorMessage = response.errors[0].title;
        }

        /**
         * Handle the success event.
         */
        handleSuccess(file: any, response: any)
        {
            this.$emit('uploaded', response);
        }

        /**
         * Handle the queue complete event.
         */
        handleQueueComplete(): void
        {
            this.$emit('uploadComplete');
        }

        /**
         * Upload the files.
         */
        upload(): void
        {
            let dropzone: any = this.$refs.dropzone;
            dropzone.processQueue();
        }

        mounted()
        {
            let templateEl: Element|null = this.$el.querySelector('#previewTemplate');
            this.previewTemplate = templateEl ? templateEl.innerHTML : '';
        }
    }

    export default FileUpload;

</script>
