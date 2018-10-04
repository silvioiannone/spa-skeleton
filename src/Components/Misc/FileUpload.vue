<template>
    <div>
        <vue-dropzone v-if="previewTemplate" ref="dropzone" id="dropzone" :options="dropzoneOptions"
                      :useCustomSlot=true class="dropzone" :include-styling="false"
                      v-on:vdropzone-thumbnail="generateThumbnail"
                      v-on:vdropzone-error="handleError" v-on:vdropzone-success="handleSuccess">
            <div>
                <h3>Drag and drop to upload a file!</h3>
                <p>...or click/tap to select one.</p>
            </div>
        </vue-dropzone>
        <v-alert type="error" :value="errorMessage.length" class="mt-3">{{ errorMessage }}</v-alert>
        <div class="mt-3">
            <v-btn color="primary" @click="upload" :loadinig="uploading">Upload</v-btn>
            <v-btn flat @click="cancel">Cancel</v-btn>
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
                    <div class="text-xs-right">
                        <v-btn icon data-dz-remove>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import VueDropzone from 'vue2-dropzone';
    import Token from '../../Library/API/Token';

    export default {

        name: 'FileUpload',

        components: {
            VueDropzone
        },

        props: {

            /**
             * Dropzone options object that will be merged with the default one.
             */
            options: {
                type: Object,
                default: () => { return {} }
            }
        },

        data()
        {
            return {
                errorMessage: '',
                test: '',
                previewTemplate: null,
                uploading: false
            }
        },

        computed: {

            config() {
                return this.$store.getters.app.config;
            },

            dropzoneOptions() {
                return {
                    autoProcessQueue: false,
                    headers: {
                        Authorization: 'Bearer ' + (new Token).getAccessToken()
                    },
                    previewTemplate: this.previewTemplate,
                    thumbnailHeight: null,
                    thumbnailWidth: 640,
                    url: '/api/v1/files',
                    ...this.options,
                }
            }
        },

        methods: {

            /**
             * Cancel the upload.
             */
            cancel()
            {
                this.$emit('cancel')
            },

            /**
             * Generate the thumbnail.
             *
             * @param file
             * @param dataUrl
             * @returns {number}
             */
            generateThumbnail(file, dataUrl)
            {
                let j, len, ref, thumbnailElement;

                if (file.previewElement) {
                    file.previewElement.classList.remove("dz-file-preview");
                    ref = file.previewElement.querySelectorAll("[data-dz-thumbnail-bg]");
                    for (j = 0, len = ref.length; j < len; j++) {
                        thumbnailElement = ref[j];
                        thumbnailElement.alt = file.name;
                        thumbnailElement.style.backgroundImage = 'url("' + dataUrl + '")';
                    }
                    return setTimeout(((function(_this) {
                        return function() {
                            return file.previewElement.classList.add("dz-image-preview");
                        };
                    })(this)), 1);
                }
            },

            /**
             * Handle the error event.
             */
            handleError(file, message, xhr)
            {
                if (! xhr) {
                    return;
                }

                let response = JSON.parse(xhr.response);

                this.errorMessage = response.errors[0].title;
            },

            /**
             * Handle the success event.
             */
            handleSuccess(file, response)
            {
                this.$store.commit('files/ADD', response);
                this.$emit('uploaded', response);
            },

            /**
             * Upload the files.
             */
            upload()
            {
                this.$refs.dropzone.processQueue();
            }
        },

        mounted()
        {
            this.previewTemplate = this.$el
                .querySelector('#previewTemplate')
                .innerHTML;
        }
    }


</script>
