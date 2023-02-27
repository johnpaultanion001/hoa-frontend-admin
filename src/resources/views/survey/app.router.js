const config = {prefix: "/surveys", name: "surveys"};
export default [
    {
        path: config.prefix,
        name: `${config.name}.index`,
        component: () => import("./list.component.vue"),
        meta: {
            title: "Available Survey List",
        },
    },
    {
        path: config.prefix + '/create',
        name: `${config.name}.create`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Create Survey"
        }
    },
    {
        path: config.prefix + '/:id/edit',
        name: `${config.name}.edit`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Update Survey"
        }
    },
    {
        path: config.prefix + '/:id/report',
        name: `${config.name}.report`,
        component: () => import('./report.component.vue'),
        meta: {
            title: "Survey Response Report"
        }
    }
];
