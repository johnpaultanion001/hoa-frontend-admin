const config = {prefix: "/reservation-booking/requests", name: "reservation-booking-request"};
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
