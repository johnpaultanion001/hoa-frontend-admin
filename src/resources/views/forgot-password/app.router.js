const config = {prefix: "/auth/forgot-password", name: "forgot-password"};

export default [
    {
        path: config.prefix,
        name: `${config.name}`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Lorem Ipsum is simply dummy text of the printing."
        }
    }
];
