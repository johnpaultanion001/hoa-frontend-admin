const config = {prefix: "/maintenance-service/requests", name: "maintenance-service-request"};
export default [

    {
        path: config.prefix,
        name: `${config.name}.index`,
        component: () => import('./list.component.vue'),
        meta: {
            title: "List  Maintenance Service "
        }
    }
];
