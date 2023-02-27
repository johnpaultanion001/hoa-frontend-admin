<template>
    <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
        <div class="container-fluid">
            <div class="navbar-wrapper">
                <div class="navbar-toggle">
                    <button type="button" class="navbar-toggler">
                        <span class="navbar-toggler-bar bar1"></span>
                        <span class="navbar-toggler-bar bar2"></span>
                        <span class="navbar-toggler-bar bar3"></span>
                    </button>
                </div>
                <a class="navbar-brand" href="javascript:;"></a>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-bar navbar-kebab"></span>
                <span class="navbar-toggler-bar navbar-kebab"></span>
                <span class="navbar-toggler-bar navbar-kebab"></span>
            </button>
            <a href="javascript:;" class="pl-5 text-decoration-none font-weight-bold" @click="logout$">LOGOUT <i class="fas fa-sign-out-alt"></i></a>
        </div>
    </nav>
</template>

<script>
export default {
    data: () => {
        return {};
    },
    async mounted() {},
    methods: {
        async logout$() {
            await this.$storage.remove("auth");
            await this.$router.push({ name: "login" });
        },
    },
};
</script>
