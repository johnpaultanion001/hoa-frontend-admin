import { alertService } from "@/services/alert/alert.service";
import { serviceService } from "@/services/service/service.service";
import { filter } from "../../../../shared/mockup/filter.mockup";
import { bookingService } from "../../../../services/booking/booking.service";
import { statuses } from "../../../../shared/mockup/statuses.mockup";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import CalendarBookingComponent from "../../../components/calendar-booking.component.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { userService } from "../../../../services/users/user.service";
export default {
    components: { DatePicker, CalendarBookingComponent, vSelect },
    data: () => {
        return {
            data: {
                personal_details: {},
                contact_details: {},
                address_details: {},
                type: filter.service_type.reservation_booking,
                status_id: statuses[1].id,
                booking_details: [],
            },
            error: {},
            config: {
                step: 1,
            },
            services: [],
            time_slots: [],
            date_available: [],
            assignees: [],
        };
    },
    async mounted() {
        let additional = {};
        await this.init_assignees();
        if (this.$profile().role == "super_admin") {
            additional = {
                company_id: this.assignees[0].id,
            };

            this.data.company_id = this.assignees[0].id;
        }
        await this.list_services(additional);

        if (this.$route.params.id) {
            await this.show(this.$route.params.id);
        }
    },
    methods: {
        async store$() {
            var callback = async () => {
                await bookingService
                    .store(this.data)
                    .then(() => {
                        this.error = {};
                        alertService.success("success", "success");

                        this.data = {
                            company_id: this.data.company_id ? this.data.company_id : null,
                            personal_details: {},
                            contact_details: {},
                            address_details: {},
                            type: filter.service_type.reservation_booking,
                            status_id: statuses[1].id,
                            booking_details: [],
                        };
                        this.config.step = 1;
                    })
                    .catch((response) => {
                        this.error = response;
                    });
            };
            alertService.confirmation(callback, "Confirmation", "Are you sure?");
        },
        async update$() {
            var callback = async () => {
                await bookingService
                    .update(this.$route.params.id, this.data)
                    .then(async () => {
                        this.error = {};
                        alertService.success("success", "success");
                        this.$router.push({ name: "reservation-booking-manual.index" });
                    })
                    .catch((response) => {
                        this.error = response;
                    });
            };
            alertService.confirmation(callback, "Confirmation", "Are you sure?");
        },
        async show(id) {
            var response = await bookingService.show(id);
            this.data = response.data;
            this.data.update_booking_details = true;
            this.data.booking_details = [];
            this.config.step = 1;
        },

        async list_services(query) {
            const response = await serviceService.list({ type: filter.service_type.reservation_booking, paginate: 0, ...query });
            this.services = response.data;
        },
        async init_events(data) {
            let filter = {};

            let service = this.services.find((el) => el.id == this.data.service_id);
            if (service.availability == "days") {
                filter = data;
            }
            this.date_available = await serviceService.availabilities(service.id, filter).then((response) => response.data);

            this.date_available.forEach(async (value, key) => {
                if (new Date(value.date) >= new Date()) {
                    await this.$refs.calendar.set_availability(value.date);
                    if (!value.available) {
                        await this.$refs.calendar.set_fully_booked(value.date);
                    }
                }
            });
        },
        set_booking_date(date) {
            let idx = this.data.booking_details.findIndex((el) => el.date == date);
            if (idx >= 0) {
                this.data.booking_details.splice(idx, 1);
            } else {
                this.data.booking_details.push({
                    date: date,
                    time: [],
                });
            }
        },

        set_time_slots(date) {
            let slots = [];
            let result = this.date_available.find((el) => el.date == date);
            if (result) {
                result.time_slots.forEach((value, key) => {
                    if (value.available) {
                        let input = {
                            name: `${this.$formatTime(value.from)} - ${this.$formatTime(value.to)}`,
                            time_from: `${value.from}:00`,
                            time_to: `${value.to}:00`,
                        };
                        slots.push(input);
                    }
                });
            }
            return slots;
        },
        async init_assignees() {
            const response = await userService.list({ paginate: 0, roles: `super_admin-company` });

            this.assignees = response.data;
        },
    },
};
