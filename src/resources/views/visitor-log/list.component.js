import PaginateComponent from "@/resources/components/paginate.component";
import { visitorLogService } from "../../../services/visitor-log/visitor-log.service";
import ShowComponent from "./show.component.vue";
import QrComponent from "./qr.component.vue";
import SearchComponent from "@/resources/components/search.component";
export default {
    components: { PaginateComponent, ShowComponent, QrComponent,SearchComponent},
    data: () => {
        return {
            data: {
                total: 10,
                per_page: 10,
            },
            filter: {
                per_page: 10,
                paginate: 1,
            },
        };
    },
    async mounted() {
        await this.list(this.filter);
    },
    methods: {
        async list(query) {
            const response = await visitorLogService.list(query);
            this.data = response.data;
        },
        async search$(data) {
            await this.list({ ...this.filter, ...data });
        },
    },
};
