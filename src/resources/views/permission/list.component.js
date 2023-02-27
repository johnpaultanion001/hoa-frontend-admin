import PaginateComponent from "@/resources/components/paginate.component";
import { advertisementService } from "../../../services/advertisement/advertisement.service";
import {authorized} from "../../../shared/mockup/user-setting.mockup";
export default {
    components: { PaginateComponent },
    data: () => {
        return {
            data: authorized.roles,
            filter: {},
        };
    },
    async mounted() {
    },
    methods: {

    },
};
