import { alertService } from "@/services/alert/alert.service";
import { userDetailService } from "../../../services/user-detail/user-detail.service";
import { userSettingService } from "../../../services/user-setting/user-setting.service";
import { surveyService } from "@/services/survey/survey.service";

export default {
    data: () => {
        return {
            data: {
                title: "",
                description: "",
                enabled: false,
                questions: [
                    {
                        content: "",
                        required: true,
                        type: "text",
                        options: []
                    }
                ]
            },
            error: {},
            config: {},
            assignees: [],
        };
    },

    async mounted() {
        if (this.$route.params.id) {
            await this.show(this.$route.params.id);
        }
    },

    methods: {
        add_question() {
            this.data.questions.push(
                {
                    content: "",
                    required: true,
                    type: "text",
                    options: []
                }
            );
        },

        remove_question(index) {
            if(this.data.questions.length > 1) {
                this.data.questions.splice(index, 1);
            }
        },

        add_option(index) {
            this.data.questions[index].options.push(
                {
                    content: "",
                    type: this.data.questions[index].type,
                }
            )
        },

        remove_option(q_index, o_index) {
            if(this.data.questions[q_index].options.length > 1) {
                this.data.questions[q_index].options.splice(o_index, 1);
            }
        },

        async show(id) {
            var response = await surveyService.show(id);
            if(response.data.enabled == 1) {
                this.$router.go(-1);
            }
            this.data.title = response.data.title;
            this.data.description = response.data.description; 
            this.data.questions = response.data.questions;
        },

        async store$() {
            var callback = async () => {
                if (this.data.role == "company") {
                    let result = await userSettingService.list({ client: this.data.user_setting_company.value.client, paginate: 0 });
                    let exist = result.data.length > 0 ? true : false;
                    this.config.user_setting_company_exist = exist;

                    if (exist) {
                        return;
                    }
                }

                await surveyService
                    .store(this.data)
                    .then(async (result) => {
                        this.error = {};
                        alertService.success("success", "success");
                        this.$router.push({name: 'surveys.index'});
                    })
                    .catch((response) => {
                        this.error = response;
                        result = result.data;
                    });
            };
            alertService.confirmation(callback, "Confirmation", "Are you sure?");
        },

        async update$() {
            var callback = async () => {
                await surveyService
                    .update(this.$route.params.id, this.data)
                    .then(async (result) => {
                        this.error = {};
                        alertService.success("success", "success");
                        this.$router.push({name: 'surveys.index'});
                    })
                    .catch((response) => {
                        this.error = response;
                        result = result.data;
                    });
            };
            alertService.confirmation(callback, "Confirmation", "Are you sure?");
        }
    }
}