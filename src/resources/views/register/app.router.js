const config = {prefix: "/auth/register", name: "register"};

export default [
    {
        path: config.prefix,
        name: `${config.name}`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Please Register to Continue."
        }
    }
];
