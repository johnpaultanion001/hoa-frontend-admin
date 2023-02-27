import { visitorLogService } from "../../../services/visitor-log/visitor-log.service";
import { alertService } from "../../../services/alert/alert.service";
import { fileService } from "../../../services/file/file.service";
import { userService } from "../../../services/users/user.service";

export default {
    data() {
        return {
            data: {
                table_type: "users",
                file_identification: {},
            },
            error: {},
            users: [],
            assignees: [],
        };
    },
    async mounted() {
        await this.init_assignees();
        await this.init_users({ paginate: 0, roles: "client" });
    },
    methods: {
        async upload$($event, data, key) {
            await fileService.upload($event.target.files[0], { directory: "identifications" }).then((success) => {
                this.data[key] = { ...this.data[key], ...success.data, ...data };
            });
        },
        async store$() {
            var callback = async () => {
                await visitorLogService
                    .store(this.data)
                    .then(async (success) => {
                        await fileService.store({ ...this.data.file_identification, table_type: "visitor_logs", table_id: success.data.id });

                        this.error = {};
                        alertService.success("success", "success");
                        this.data = {
                            file_identification: {},
                            table_type: "users",
                        };
                        this.$emit("event", {});
                    })
                    .catch((response) => {
                        this.error = response;
                    });
            };
            alertService.confirmation(callback, "Confirmation", "Are you sure?");
        },
        async init_users(query) {
            let result = await userService.list(query);
            this.users = result.data;
        },
        async init_assignees() {
            const response = await userService.list({ paginate: 0, roles: `super_admin-company` });

            this.assignees = response.data;
        },
    },
};
