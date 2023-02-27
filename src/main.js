import Vue from "vue";
import { Vue2Storage } from "vue2-storage";
import App from "./App.vue";
import router from "./router";
import AppMixin from "./app.mixin";
import "bootstrap";
import "./resources/assets/js/main";
import config from "./config/app.config";
import { firebase } from "./globals/firebase";
import BootstrapVue from "bootstrap-vue";
import excel from 'vue-excel-export'

import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";
Vue.config.productionTip = false;

Vue.mixin(AppMixin);
Vue.use(Vue2Storage);
Vue.use(excel);
Vue.use(wysiwyg, {});
firebase.initializeApp(config.firebaseConfig);
Vue.use(BootstrapVue);

new Vue({
    router,
    render: function (h) {
        return h(App);
    },
}).$mount("#app");
