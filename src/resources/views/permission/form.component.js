import {alertService} from "@/services/alert/alert.service";
import {fileService} from "../../../services/file/file.service";
import {advertisementService} from "../../../services/advertisement/advertisement.service";
import {permissionService} from "../../../services/permission/permission.service";

export default {
    data: () => {
        return {
            data: [],
            error: {},
            config: {},
            permissions: []
        };
    },
    async mounted() {
        await this.init_permissions();
        if (this.$route.params.id) {
            await this.show(this.$route.params.id);
        }
    },
    methods: {

        async update$() {

            var callback = async () => {
                await permissionService
                    .update(this.$route.params.id, {data: this.data})
                    .then(async (success) => {

                        location.reload();
                    })
                    .catch((response) => {
                        this.error = response;
                    });
            };
            alertService.confirmation(callback, "Confirmation", "Are you sure?");
        },
        is_change($event, data) {

            if ($event.target.checked) {
                let input = {
                    ...data,
                    role: this.$route.params.id
                }
                this.data.push(input);
            } else {
                let index = this.data.findIndex(el => el.key == data.key);

                this.data.splice(index, 1);
            }
        },
        is_checked(value) {
            let checked = false;
            let exist = this.data.find(el => el.key == value.key);
            if (exist) {
                checked = true;
            }

            return checked;
        },
        async show(id) {
            var response = await permissionService.list({role: id, paginate: 0});

            this.data = response.data;
            // this.data = response.data;
        },
        async init_permissions() {
            let response = await permissionService.lookup();

            this.permissions = response.data;
        }
    },
};
