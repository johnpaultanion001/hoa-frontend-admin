import QrcodeVue from "qrcode.vue";

export default {
    components: { QrcodeVue },
    name: "show.component",
    data() {
        return {
            datum: {
                file_identification: {},
                status: {},
            },
            config: {
                show_id: false,
                show_qr: false,
            },
        };
    },
    async created() {},
    methods: {
        async show(datum) {
            this.datum = datum;
            this.$bvModal.show("show");
        },
    },
};
