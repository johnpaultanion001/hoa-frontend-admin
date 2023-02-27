const config = {prefix: "/", name: "dashboard"};
export default [

    {
        path: config.prefix,
        name: `${config.name}.index`,
        component: () => import('./list.component.vue'),
        meta: {
            title: "Dashboard"
        }
    }
];
