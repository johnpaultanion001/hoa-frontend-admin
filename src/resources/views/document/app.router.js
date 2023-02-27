const config = { prefix: "/documents", name: "document" };
export default [
    {
        path: config.prefix,
        name: `${config.name}.index`,
        component: () => import("./list.component.vue"),
        meta: {
            title: "Documents",
        },
    },
    {
        path: config.prefix + "/create",
        name: `${config.name}.create`,
        component: () => import("./form.component.vue"),
        meta: {
            title: "Create Document",
        },
    },
    {
        path: config.prefix + "/:id/edit",
        name: `${config.name}.edit`,
        component: () => import("./form.component.vue"),
        meta: {
            title: "Update Document",
        },
    },
];
