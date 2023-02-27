<template>
    <div class="wrapper">
        <sidebar-component />
        <div class="main-panel">
            <!-- Navbar -->
            <navbar-component />
            <!-- End Navbar -->
            <div class="content">
                <router-view />
            </div>

            <footer-component />
        </div>
    </div>
</template>
<style></style>
<script>
import NavbarComponent from "../components/navbar.component";
import FooterComponent from "../components/footer.component";
import SidebarComponent from "../components/sidebar.component";
export default {
    components: {
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
    },
    mounted() {},
};
</script>
