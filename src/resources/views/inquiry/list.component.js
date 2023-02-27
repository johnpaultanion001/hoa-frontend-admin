import PaginateComponent from "@/resources/components/paginate.component";
import { alertService } from "@/services/alert/alert.service";
import { inquiryService } from "@/services/inquiry/inquiry.service";
import SearchComponent from "@/resources/components/search.component";
export default {
    components: { PaginateComponent,SearchComponent },
    data: () => {
        return {
            data: {
                total: 100,
                per_page: 10,
            },
            filter: {
                per_page: 11,
                paginate: 1,
            },
        };
    },
    async mounted() {
        await this.list(this.filter);
    },
    methods: {
        async list(query) {
            const response = await inquiryService.list(query);
            this.data = response.data;
        },
        async search$(data) {
            await this.list({ ...this.filter, ...data });
        },
        async delete$(id) {
            var callback = async () => {
                await sampleService.delete(id);
                inquiryService.success("Success", "Record Successfully Deleted");
                await this.list(this.filter);
            };
            alertService.confirmation(callback, "Are you sure?", "Cant be revert.");
        },
    },
};
