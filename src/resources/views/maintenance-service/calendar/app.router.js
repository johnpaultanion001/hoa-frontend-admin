const config = {prefix: "/maintenance-service/calendars", name: "maintenance-service-calendar"};
export default [

    {
        path: config.prefix,
        name: `${config.name}.index`,
        component: () => import('./list.component.vue'),
        meta: {
            title: "List  Reservations "
        }
    }
];
