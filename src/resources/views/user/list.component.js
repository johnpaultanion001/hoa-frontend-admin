import {userService} from "@/services/users/user.service";
import PaginateComponent from "@/resources/components/paginate.component";
import {alertService} from "@/services/alert/alert.service";
import SearchComponent from "@/resources/components/search.component";

export default {
    components: {PaginateComponent,SearchComponent},
    data: () => {
        return {
            data: {
                total: 10,
                per_page: 10
            },
            filter: {
                per_page: 10,
                paginate: 1
            }
        }
    },
    async mounted() {
        await this.list(this.filter);
    },
    methods: {

        async list(query) {
            const response = await userService.list(query);
            this.data = response.data;
        },
        async search$(data) {
            await this.list({...this.filter, ...data});

        },
        async delete$(id) {
            var callback = async () => {
                await userService.delete(id);
                await this.list(this.filter);
                alertService.success('Success', 'Record Successfully Deleted');
            }
            alertService.confirmation(callback, 'Are you sure?', 'Cant be revert.');
        },
        async update$(data) {
            var callback = async () => {
                data.disabled = !data.disabled;

                await userService.update(data.id, data)
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
        },
    }

}
