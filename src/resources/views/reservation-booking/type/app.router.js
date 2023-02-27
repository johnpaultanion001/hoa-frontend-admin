const config = {prefix: "/reservation-booking/types", name: "reservation-booking-type"};
export default [

    {
        path: config.prefix,
        name: `${config.name}.index`,
        component: () => import('./list.component.vue'),
        meta: {
            title: "List Amenities "
        }
    },
    {
        path: config.prefix + '/create',
        name: `${config.name}.create`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Create Amenity"
        }
    },
    {
        path: config.prefix + '/:id/edit',
        name: `${config.name}.edit`,
        component: () => import('./form.component.vue'),
        meta: {
            title: "Update Amenity"
        }
    }
];
