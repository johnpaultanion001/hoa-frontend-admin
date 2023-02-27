import PaginateComponent from "@/resources/components/paginate.component";
import { alertService } from "@/services/alert/alert.service";
import { surveyService } from "@/services/survey/survey.service";
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
        getDate(date) {
            let f_date = new Date(date);
            return ((f_date.getMonth() > 8) ? (f_date.getMonth() + 1) : ('0' + (f_date.getMonth() + 1))) + '/' + ((f_date.getDate() > 9) ? f_date.getDate() : ('0' + f_date.getDate())) + '/' + f_date.getFullYear()
        },

        async list(query) {
            const response = await surveyService.list(query);
            this.data = response.data;
        },

        async search$(data) {
            await this.list({ ...this.filter, ...data });
        },

        async update$(data) {
            var callback = async () => {
                data.enabled = !data.enabled;
                await surveyService.update(data.id, data)
                .then(async () => {
                    this.error = {};
                    alertService.success('success', 'success');
                    await this.list(this.filter);
                })
                .catch((response) => {
                    this.error = response;
                });
            }
            alertService.confirmation(callback, 'Confirmation', 'Are you sure?');
        }
    },
}