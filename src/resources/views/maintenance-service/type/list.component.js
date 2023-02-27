
import PaginateComponent from "@/resources/components/paginate.component";
import {alertService} from "@/services/alert/alert.service";
import {serviceService} from "../../../../services/service/service.service";
import {filter} from "../../../../shared/mockup/filter.mockup";

import SearchComponent from "@/resources/components/search.component";
export default {
    components: { PaginateComponent,SearchComponent },
    data: () => {
        return {
            data: {
                total: 10,
                per_page: 10
            },
            filter: {
                per_page: 10,
                paginate: 1,
                type: filter.service_type.maintenance_service,
            }
        }
    },
    async mounted() {


        await this.list(this.filter);
    },
    methods: {

        async list(query) {

            const response = await serviceService.list(query);
            this.data = response.data;

            console.log(  this.data);
        },
        async search$(data) {

          await this.list({...this.filter, ...data});
        },
        async delete$(id) {
            var callback = async () => {
                await serviceService.delete(id)
                alertService.success('Success', 'Record Successfully Deleted');
                await this.list(this.filter);
            }
            alertService.confirmation(callback, 'Are you sure?', 'Cant be revert.');
        },
    }

}
