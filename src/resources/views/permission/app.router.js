const config = {prefix: "/permissions", name: "permission"};
export default [

    {
        path: config.prefix,
        name: `${config.name}.index`,
        component: () => import('./list.component.vue'),
        meta: {
            title: "Permission"
        }
    },
    {
        path: config.prefix + '/create',
        name: `${config.name}.create`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Create Permission"
        }
    },
    {
        path: config.prefix + '/:id/edit',
        name: `${config.name}.edit`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Update Permission"
        }
    }
];
