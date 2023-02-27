import Vue from "vue";

const config = { prefix: "/settings", name: "setting" };
export default [
    {
        path: config.prefix,
        name: `${config.name}.index`,
        component: () => import("./list.component.vue"),
        meta: {
            title: "List",
        },
    },

    {
        path: config.prefix + "/:id/edit",
        name: `${config.name}.edit`,
        component: () => {
            let key = "page";
            let queryString = window.location.search;
            let urlParams = new URLSearchParams(queryString);
            key = urlParams.get("key");

            return import(`./form-${key}.component.vue`);
        },
        meta: {
            title: "Update",
        },
    },
];
