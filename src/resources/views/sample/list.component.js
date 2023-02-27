
import PaginateComponent from "@/resources/components/paginate.component";
import {alertService} from "@/services/alert/alert.service";
import {sampleService} from "@/services/sample/sample.service";

export default {
    components: {PaginateComponent},
    data: () => {
        return {
            data: {
                total: 100,
                per_page: 10
            },
            filter: {
                per_page: 1,
                paginate: 1
            }
        }
    },
    async mounted() {


        await this.list(this.filter);
    },
    methods: {

        async list(query) {

            const response = await sampleService.list(query);
            this.data = response.data;

            console.log(  this.data);
        },
        async search$(data) {

          await this.list({...this.filter, ...data});
        },
        async delete$(id) {
            var callback = async () => {
                await sampleService.delete(id)
                alertService.success('Success', 'Record Successfully Deleted');
                await this.list(this.filter);
            }
            alertService.confirmation(callback, 'Are you sure?', 'Cant be revert.');
        },
    }

}
