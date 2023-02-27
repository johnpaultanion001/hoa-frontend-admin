import {alertService} from "@/services/alert/alert.service";
import {fileService} from "../../../services/file/file.service";
import {userSettingService} from "../../../services/user-setting/user-setting.service";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    components: {VueCropper},
    data: () => {
        return {
            data: {
                value: {},
            },
            error: {},
            config: {},
            mime_type: '',
            cropedImage: '',
            autoCrop: false,
            selectedFile: '',
            image: '',
            dialog: false,
            files: '',
            cropper: {
                mime_type: '',
                dialog: false,
                file: ''
            }
        };
    },
    async mounted() {
        if (this.$route.params.id) {
            await this.show(this.$route.params.id);
        }
    },
    methods: {
        async upload$($event) {

            await fileService.upload($event.target.files[0], {directory: "settings"}).then((success) => {
                this.data.value = {...this.data.value, ...success.data};
                console.log(this.data.value);
            });
        },

        async update$() {
            var callback = async () => {
                await userSettingService
                    .update(this.$route.params.id, this.data)
                    .then(async (success) => {
                        this.error = {};
                        alertService.success("success", "success");
                        await this.show(this.$route.params.id);
                    })
                    .catch((response) => {
                        this.error = response;
                    });
            };
            alertService.confirmation(callback, "Confirmation", "Are you sure?");
        },
        async show(id) {
            var response = await userSettingService.show(id);
            this.data = response.data;
        },

        on_select_file(e) {
            const file = e.target.files[0]
            this.cropper.mime_type = file.type

            if (typeof FileReader === 'function') {
                this.cropper.dialog = true
                const reader = new FileReader()
                reader.onload = (event) => {
                    this.cropper.file = event.target.result
                    this.$refs.cropper.replace(this.cropper.file)
                }
                reader.readAsDataURL(file);
            } else {
                alert('Sorry, FileReader API not supported')
            }
        },

        save_crop() {
            this.$refs.cropper.getCroppedCanvas().toBlob(async (blob) => {

                await fileService.crop([{key: "file", blob: blob, name: "crop.jpeg"}],"settings").then((success) => {
                    this.data.value = {...this.data.value, ...success.data};
                    this.cropper.file = null;
                });

            }, this.cropper.mime_type)
        }
    },
};
