import PaginateComponent from "@/resources/components/paginate.component";
import { alertService } from "@/services/alert/alert.service";
import { filter } from "../../../../shared/mockup/filter.mockup";
import { bookingService } from "../../../../services/booking/booking.service";
import Calendar from "./calendar.component.vue";
import { statuses } from "../../../../shared/mockup/statuses.mockup";
import { serviceService } from "../../../../services/service/service.service";
import ShowComponent from "./show.component.vue";
export default {
    components: { PaginateComponent, Calendar, ShowComponent },
    data: () => {
        return {
            data: {
                total: 10,
                per_page: 10,
            },
            filter: {
                per_page: 10,
                paginate: 1,
                type: filter.service_type.reservation_booking,
            },
            config: {
                edit_status: 0,
            },
            services: [],
        };
    },
    async mounted() {
        await this.list_services(this.filter);
        await this.list(this.filter);
    },
    computed: {
        statuses() {
            return statuses.filter((el) => el.type == filter.service_type.reservation_booking);
        },
    },
    methods: {
        async list(query) {
            console.log(query);

            const response = await bookingService.list(query);
            this.data = response.data;

            console.log(this.data);
        },
        async search$(data) {
            await this.list({ ...this.filter, ...data });
        },
        async delete$(id) {
            var callback = async () => {
                await bookingService.delete(id);
                alertService.success("Success", "Record Successfully Deleted");
                await this.list(this.filter);
            };
            alertService.confirmation(callback, "Are you sure?", "Cant be revert.");
        },
        async update$(id, data) {
            var callback = async () => {
                await bookingService
                    .update(id, data)
                    .then(async () => {
                        this.error = {};
                        alertService.success("success", "success");
                        this.config.edit_status = 0;
                    })
                    .catch((response) => {
                        this.error = response;
                    });
            };
            alertService.confirmation(callback, "Confirmation", "Are you sure?");
        },
        async list_services() {
            const response = await serviceService.list({ type: filter.service_type.reservation_booking, paginate: 0 });
            this.services = response.data;
        },
        async set_date($event) {
            await this.search$($event);
        },
    },
};
