import { alertService } from "@/services/alert/alert.service";
import { serviceService } from "@/services/service/service.service";
import { serviceCategory } from "../../../../shared/mockup/service-category.mockup";
import { filter } from "../../../../shared/mockup/filter.mockup";
import { days } from "../../../../shared/mockup/days.mockup";
import { fileService } from "../../../../services/file/file.service";
import DateRangePicker from "vue2-daterange-picker";
//you need to import the CSS manually
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import { userService } from "../../../../services/users/user.service";
export default {
    components: { DateRangePicker },
    data: () => {
        return {
            data: {
                metadata: {
                    date: {},
                    slot: 0,
                    days: [7],
                    time_slots: [{}],
                },
                type: filter.service_type.maintenance_service,
                file_cover: {},
            },
            error: {},
            config: {},
            categories: serviceCategory,
            days: days,
            assignees: [],
        };
    },
    async mounted() {
        await this.init_assignees();
        if (this.$route.params.id) {
            await this.show(this.$route.params.id);
        }
    },
    methods: {
        async upload$($event, data, key) {
            await fileService.upload($event.target.files[0], { directory: "services" }).then((success) => {
                this.data[key] = { ...this.data[key], ...success.data, ...data };
            });
        },
        upadte_date($event) {
            this.data.metadata.date = {
                startDate: this.$formatDate($event.startDate),
                endDate: this.$formatDate($event.endDate),
            };
        },
        async store$() {
            var callback = async () => {
                await serviceService
                    .store(this.data)
                    .then(async (success) => {
                        await fileService.store({ ...this.data.file_cover, table_type: "services", table_id: success.data.id });

                        this.error = {};
                        alertService.success("success", "success");

                        this.data = {
                            metadata: {
                                date: {},
                                slot: 0,
                                days: [7],
                                time_slots: [{}],
                            },
                            type: filter.service_type.maintenance_service,
                            file_cover: {},
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
                await serviceService
                    .update(this.$route.params.id, this.data)
                    .then(async (success) => {
                        await fileService.update(this.data.file_cover.id, { ...this.data.file_cover, table_type: "services", table_id: success.data.id });

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
            var response = await serviceService.show(id);
            this.data = response.data;
        },
        async set_day$(data) {
            let result = this.data.metadata.days.indexOf(data);
            if (result !== -1) {
                if (this.data.metadata.days.length > 1) {
                    this.data.metadata.days.splice(result, 1);
                }
            } else {
                this.data.metadata.days.push(data);
            }
        },
        async is_active_day$(data) {
            let status = false;
            let result = this.data.metadata.days.indexOf(data);

            console.log(false);
            return status;
        },
        async set_availability$() {
            if (this.data.availability == "days") {
                this.data.metadata.days = [7];
                this.data.metadata.date = {};
            }
            if (this.data.availability == "date") {
                this.data.metadata.days = [];
            }
        },
        async init_assignees() {
            const response = await userService.list({ paginate: 0, roles: `super_admin-company` });

            this.assignees = response.data;
        },
    },
};
