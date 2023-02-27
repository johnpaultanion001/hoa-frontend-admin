import { alertService } from "@/services/alert/alert.service";
import { sampleService } from "@/services/sample/sample.service";
import { inquiryService } from "../../../services/inquiry/inquiry.service";

export default {
    data: () => {
        return {
            data: {},
            error: {},
            config: {},
        };
    },
    async mounted() {
        if (this.$route.params.id) {
            await this.show(this.$route.params.id);
        }
    },
    methods: {
        async store$() {},
        async update$() {
            var callback = async () => {
                await inquiryService
                    .reply(this.$route.params.id, { email: this.data.user.email, content: this.data.content })
                    .then(async () => {
                        this.error = {};
                        alertService.success("success", "success");
                        this.$router.push({ name: "inquiry.index" });
                    })
                    .catch((response) => {
                        this.error = response;
                    });
            };
            alertService.confirmation(callback, "Confirmation", "Are you sure?");
        },
        async show(id) {
            var response = await inquiryService.show(id);
            this.data = response.data;
        },
    },
};
