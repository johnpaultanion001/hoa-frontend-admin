<template><calendar is-expanded :attributes="attributes" @dayclick="(event) => set_date(event)" :disabled-dates="disabled_dates" :available-dates="available_dates" @update:to-page="search" /></template>

<script>
import Calendar from "v-calendar/lib/components/calendar.umd";
export default {
    components: { Calendar },
    data() {
        return {
            attributes: [],
            disabled_dates: [
                {
                    start: null,
                    end: new Date(3000, 11, 31),
                },
                {
                    start: new Date(2000, 1, 1),
                    end: null,
                },
            ],
            available_dates: [],
        };
    },
    methods: {
        async set_date($event) {
            if (!$event.isDisabled) {
                let idx = this.attributes.findIndex((el) => el.id == $event.id);
                if (idx >= 0) {
                    if (this.attributes[idx].customData.available) {
                        this.attributes.splice(idx, 1);
                        this.$emit("set_date", $event.id);
                    }
                } else {
                    this.attributes.push({
                        id: $event.id,
                        highlight: true,
                        dates: $event.date,
                        customData: {
                            available: true,
                        },
                    });
                    this.$emit("set_date", $event.id);
                }
            }
        },
        async set_availability(date) {
            this.available_dates.push({
                start: date,
                end: date,
            });
        },
        async set_fully_booked(date) {
            this.attributes.push({
                id: date,
                highlight: "red",
                dates: date,
                customData: {
                    available: false,
                },
            });
        },
        async reset() {
            this.attributes = [];
            this.available_dates = [];
        },
        search($event) {
            this.$emit("search", { year: $event.year, month: $event.month });
        },
    },
};
</script>
