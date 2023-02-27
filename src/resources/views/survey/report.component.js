import PaginateComponent from "@/resources/components/paginate.component";
import { alertService } from "@/services/alert/alert.service";
import { responseService } from "@/services/response/response.service";
import SearchComponent from "@/resources/components/search.component";

export default {
    components: { PaginateComponent,SearchComponent },
    data: () => {
        return {
            data: {
                total: 100,
                per_page: 10,
                survey: {
                    title: "",
                }
            },
            filter: {
                per_page: 11,
                paginate: 1,
            },
            fields: {
                "title": "survey.title",
                "date answered": "created_at",
                "responder": "user.name",
                "email": "user.email",
            }
        };
    },
    async mounted() {
        if (this.$route.params.id) {
            this.filter.survey_id = this.$route.params.id;
            await this.init_responses(this.filter);
        }
    },
    methods: {
        getDate(date) {
            let f_date = new Date(date);
            return ((f_date.getMonth() > 8) ? (f_date.getMonth() + 1) : ('0' + (f_date.getMonth() + 1))) + '/' + ((f_date.getDate() > 9) ? f_date.getDate() : ('0' + f_date.getDate())) + '/' + f_date.getFullYear()
        },
        async init_responses(query) {
            const response = await responseService.list(query);
            this.data = response.data;

            for(let index = 0; index < this.data.survey.questions.length; index++) {
                this.fields[this.data.survey.questions[index].content] = {
                    field: "answers",
                    callback: (value) => {
                        return `${value[index].answer}`;
                    }
                };
            }
        }
    }
}