const config = {prefix: "/reservation-booking/calendars", name: "reservation-booking-calendar"};
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
