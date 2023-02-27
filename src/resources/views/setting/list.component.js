import PaginateComponent from "@/resources/components/paginate.component";
import { alertService } from "@/services/alert/alert.service";
import { userSettingService } from "../../../services/user-setting/user-setting.service";
export default {
    components: { PaginateComponent },
    data: () => {
        return {
            data: {
                total: 10,
                per_page: 1,
            },
            filter: {
                per_page: 10,
                paginate: 1,
                keys: "logo",
            },
        };
    },
    async mounted() {
        await this.list(this.filter);
    },
    methods: {
        async list(query) {
            const response = await userSettingService.list(query);
            this.data = response.data;
        },
        async search$(data) {
            this.filter = { ...this.filter, ...data };
            await this.list(this.filter);
        },
        async delete$(id) {
            var callback = async () => {
                await userSettingService.delete(id);
                await this.list(this.filter);
                alertService.success("Success", "Record Successfully Deleted");
            };
            alertService.confirmation(callback, "Are you sure?", "Cant be revert.");
        },

    },
};
