<template>

    <div class="row text-center">
        <div class="col-lg-12">
            <paginate
                :page-count="page_count"
                :click-handler="paginate$"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination justify-content-center'"
                :page-link-class="'page-link'"
                :page-class="'page-item'"
                :next-link-class="'page-link'"
                :next-class="'page-item'"
                :prev-link-class="'page-link'"
                :prev-class="'page-item'"
            >
            </paginate>
        </div>
    </div>
</template>

<script>
import Paginate from 'vuejs-paginate';

export default {
    props: ["page_count"],
    components: {
        Paginate
    },
    data: () => {
        return {}
    },
    methods: {
        async paginate$(page) {

            this.$emit('event', {page: page});
        }
    }
}

</script>