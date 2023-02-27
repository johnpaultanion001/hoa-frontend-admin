import { alertService } from "@/services/alert/alert.service";
import { fileService } from "../../../services/file/file.service";
import { documentService } from "../../../services/document/document.service";
import { userService } from "@/services/users/user.service";
export default {
    data: () => {
        return {
            data: {
                file_document: {},
            },
            error: {},
            config: {},
            users: [],
            assignees: [],
        };
    },
    async mounted() {
        await this.init_assignees();
        await this.init_users({ paginate: 0, roles: "client" });
        if (this.$route.params.id) {
            await this.show(this.$route.params.id);
        }
    },
    methods: {
        async upload$($event, data, key) {
            await fileService.upload($event.target.files[0], { directory: "documents" }).then((success) => {
                this.data[key] = { ...this.data[key], ...success.data, ...data };
            });
        },
        async store$() {
            var callback = async () => {
                await documentService
                    .store(this.data)
                    .then(async (success) => {
                        if(success.data.users === undefined) {
                            await fileService.store({ ...this.data.file_document, table_type: "documents", table_id: success.data.id });
                        } else {
                            success.data.users.forEach(async id => {
                                console.log(id);
                                await fileService.store({ ...this.data.file_document, table_type: "documents", table_id: id });
                            });
                        }
                        

                        this.error = {};
                        alertService.success("success", "success");

                        this.data = {
                            file_document: {},
                        };
                    })
                    .catch((response) => {
                        this.error = response;
                    });
            };
            alertService.confirmation(callback, "Confirmation", "Are you sure?");
        },
        async update$() {
            var callback = async () => {
                await documentService
                    .update(this.$route.params.id, this.data)
                    .then(async (success) => {
                        if (this.data.file_document && this.data.file_document.id) {
                            await fileService.update(this.data.file_document.id, { ...this.data.file_document, table_type: "documents", table_id: success.data.id });
                        } else {
                            await fileService.store({ ...this.data.file_document, table_type: "documents", table_id: success.data.id });
                        }

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
            var response = await documentService.show(id);
            this.data = response.data;
            this.data.file_document = this.data.file_document ? this.data.file_document : {};
        },
        async init_users(query) {
            const response = await userService.list(query);
            this.users = response.data;
        },
        async init_assignees() {
            const response = await userService.list({ paginate: 0, roles: `super_admin-company` });

            this.assignees = response.data;
        },
    },
};
