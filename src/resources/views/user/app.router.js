const config = {prefix: "/users", name: "user"};
export default [

    {
        path: config.prefix,
        name: `${config.name}.index`,
        component: () => import('./list.component.vue'),
        meta: {
            title: "Users"
        }
    },
    {
        path: config.prefix + '/create',
        name: `${config.name}.create`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Create User"
        }
    },
    {
        path: config.prefix + '/:id/edit',
        name: `${config.name}.edit`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Update User"
        }
    }
];
