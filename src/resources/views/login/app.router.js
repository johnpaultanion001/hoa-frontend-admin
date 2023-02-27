const config = {prefix: "/auth/login", name: "login"};

export default [
    {
        path: config.prefix,
        name: `${config.name}`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Please Login to Continue."
        }
    }
];
