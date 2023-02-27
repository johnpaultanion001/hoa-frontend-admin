<template>
    <div>
        <b-modal size="lg" id="show" centered hide-footer>
            <template #modal-title>Date and Time Details </template>
            <div class="row">
                <div class="col-lg-12 table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>DATE</th>
                                <th>TIME</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(value, key) in data.booking_details" :key="key">
                                <td>
                                    {{ value.date }}
                                </td>
                                <td>{{ $formatTime(value.time_from) }} - {{ $formatTime(value.time_to) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: {
                booking_details: [],
            },
        };
    },
    methods: {
        show(data) {
            this.data = data;
            console.log(this.data);
            this.$bvModal.show("show");
        },
    },
};
</script>
