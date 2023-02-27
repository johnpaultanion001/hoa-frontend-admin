const config = { prefix: "/events-announcements", name: "events-announcements" };
export default [
    {
        path: config.prefix,
        name: `${config.name}.index`,
        component: () => import("./list.component.vue"),
        meta: {
            title: "Events and Announcements",
        },
    },
    {
        path: config.prefix + "/create",
        name: `${config.name}.create`,
        component: () => import("./form.component.vue"),
        meta: {
            title: "Create Events and Announcements",
        },
    },
    {
        path: config.prefix + "/:id/edit",
        name: `${config.name}.edit`,
        component: () => import("./form.component.vue"),
        meta: {
            title: "Update Events and Announcements",
        },
    },
];
