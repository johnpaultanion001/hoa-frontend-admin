import { alertService } from "@/services/alert/alert.service";
import { userDetailService } from "../../../services/user-detail/user-detail.service";
import { userSettingService } from "../../../services/user-setting/user-setting.service";
import { userService } from "../../../services/users/user.service";
import { authorized, statuses } from "../../../shared/mockup/user-setting.mockup";

export default {
    data: () => {
        return {
            data: {
                disabled: 0,
                user_setting_company: {
                    key: "company",
                    value: {},
                },
                user_detail: {},
            },
            error: {},
            config: {
                user_setting_company_exist: false,
            },
            statuses: statuses,
            roles: [],
            assignees: [],
        };
    },
    async mounted() {
        await this.init_users();
        this.roles = authorized.roles_by_role[this.$profile().role];
        if (this.$route.params.id) {
            await this.show(this.$route.params.id);
        }
    },
    methods: {
        async store$() {
            var callback = async () => {
                if (this.data.role == "company") {
                    let result = await userSettingService.list({ client: this.data.user_setting_company.value.client, paginate: 0 });
                    let exist = result.data.length > 0 ? true : false;
                    this.config.user_setting_company_exist = exist;

                    if (exist) {
                        return;
                    }
                }

                await userService
                    .store(this.data)
                    .then(async (result) => {
                        this.error = {};
                        result = result.data;
                        let company_id = this.data.user_detail.company_id;
                        if (this.data.role == "company") {
                            await userSettingService.store({ user_id: result.id, ...this.data.user_setting_company });
                            company_id = result.id;
                        }

                        if (this.data.role != "client") {
                            await userDetailService.store({ user_id: result.id, company_id: company_id, ...this.data.user_detail });
                        }
                        if (this.data.role == "client") {
                            await userDetailService.store({ user_id: result.id, company_id: company_id, ...this.data.user_detail });
                        }
                        alertService.success("success", "success");
                        this.data = {
                            user_setting_company: {
                                key: "company",
                                value: {},
                            },
                            user_detail: {},
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
                await userService
                    .update(this.$route.params.id, this.data)
                    .then(async (result) => {
                        result = result.data;
                        if (this.data.role != "client") {
                            let company_id;

                            if (["super_admin", "company"].includes(this.data.role)) {
                                company_id = result.id;
                            }

                            if (!this.data.user_detail.id) {
                                await userDetailService.store({ user_id: result.id, company_id: company_id, ...this.data.user_detail });
                            } else {
                                await userDetailService.update(this.data.user_detail.id, this.data.user_detail);
                            }
                        }
                        if (this.data.role == "client") {

                            if (!this.data.user_detail.id) {
                                await userDetailService.store({ user_id: result.id, ...this.data.user_detail });
                            } else {
                                await userDetailService.update(this.data.user_detail.id, this.data.user_detail);
                            }
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
            var response = await userService.show(id);
            let data = response.data;

            if (data.role == "company") {
                let result = await userSettingService.list({ user_id: data.id, paginate: 0 });
                data.user_setting_company = result.data[0];
            }

            if (data.role != "client") {
                let result = await userDetailService.list({ user_id: data.id, paginate: 0 });
                data.user_detail = result.data[0] ? result.data[0] : {};
            }

            if (data.role == "client") {
                let result = await userDetailService.list({ user_id: data.id, paginate: 0 });
                data.user_detail = result.data[0] ? result.data[0] : {};
            }



            this.data = data;
        },
        add_admin(value) {
            console.log(value);
        },
        async init_users() {
            const response = await userService.list({ paginate: 0, roles: `super_admin-company` });

            this.assignees = response.data;
        },
    },
    watch: {
        "data.user_setting_company.value.client": {
            handler: function (after, before) {
                if (this.data.user_setting_company) {
                    this.data.user_setting_company.value.admin = after ? `admin-${after}` : "";
                }
            },
            deep: true,
        },
    },
};
