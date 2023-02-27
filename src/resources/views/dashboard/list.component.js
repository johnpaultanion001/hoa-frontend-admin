import PureVueChart from "pure-vue-chart";
import { analyticService } from "../../../services/analytic/analytic.service";
export default {
    components: { PureVueChart },
    data: () => {
        return {
            data: {
                reservation: {
                    pending: 0,
                    declined: 0,
                    approved: 3,
                },
                maintenances: {
                    pending: 0,
                    declined: 0,
                    approved: 0,
                },
                inquiries: {
                    resolved: 0,
                    pending: 0,
                },
                visitors: {
                    total: 0,
                },
            },
            filter: {
                page: 1,
            },
            config: {
                chart_width: 0,
            },
        };
    },
    async mounted() {
        await this.list(this.filter);
    },
    methods: {
        async list(query) {
            const response = await analyticService.all(query);

            this.data = response.data;
            this.config.chart_width = this.parentWidth("chart");
        },
        parentWidth(elem) {
            let doc = document.getElementById(elem);
            return parseInt(doc.parentElement.clientWidth - 30);
        },
    },
};
