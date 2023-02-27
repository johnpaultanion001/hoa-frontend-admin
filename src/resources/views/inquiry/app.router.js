const config = { prefix: "/inquiries", name: "inquiry" };
export default [
    {
        path: config.prefix,
        name: `${config.name}.index`,
        component: () => import("./list.component.vue"),
        meta: {
            title: "Messages List",
        },
    },

    {
        path: config.prefix + "/:id/edit",
        name: `${config.name}.edit`,
        component: () => import("./form.component.vue"),
        meta: {
            title: "Update Message",
        },
    },
];
