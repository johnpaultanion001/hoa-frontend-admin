const config = {prefix: "/reservation-booking/manuals", name: "reservation-booking-manual"};
export default [

    {
        path: config.prefix,
        name: `${config.name}.index`,
        component: () => import('./list.component.vue'),
        meta: {
            title: "List Manual Reservation "
        }
    },
    {
        path: config.prefix + '/create',
        name: `${config.name}.create`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Create Manual Reservation"
        }
    },
    {
        path: config.prefix + '/:id/edit',
        name: `${config.name}.edit`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Update Manual Reservation"
        }
    }
];
