import TypeRouter from "./type/app.router";
import ManualRouter from "./manual/app.router";
import RequestRouter from "./request/app.router";
import CalendarRouter from "./calendar/app.router";


const config = {prefix: "/reservation-booking", name: "reservation-booking"};
export default [
    {
        path: `${config.prefix}/types`,
        component: () => import('./type/app.component'),
        children: TypeRouter,
        meta: { }
    },
    {
        path: `${config.prefix}/manuals`,
        component: () => import('./manual/app.component'),
        children: ManualRouter,
        meta: { }
    },
    {
        path: `${config.prefix}/requests`,
        component: () => import('./request/app.component'),
        children: RequestRouter,
        meta: { }
    },
    {
        path: `${config.prefix}/calendars`,
        component: () => import('./calendar/app.component'),
        children: CalendarRouter,
        meta: { }
    },
];
