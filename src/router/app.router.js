import UserRouter from "../resources/views/user/app.router";
import SampleRouter from "../resources/views/sample/app.router";
import MaintenanceServiceRouter from "../resources/views/maintenance-service/app.router";
import ReservationBookingRouter from "../resources/views/reservation-booking/app.router";
import DashboardRouter from "../resources/views/dashboard/app.router";
import VisitorLogRouter from "../resources/views/visitor-log/app.router";
import AdvertisementRouter from "../resources/views/advertisement/app.router";
import EventAnnouncementRouter from "../resources/views/event-announcement/app.router";
import DocumentRouter from "../resources/views/document/app.router";
import SettingRouter from "../resources/views/setting/app.router";
import InquiryRouter from "../resources/views/inquiry/app.router";
import PermissionRouter from "../resources/views/permission/app.router";
import SurveyRouter from "../resources/views/survey/app.router";
const config = { prefix: "/" };
export default [
    {
        path: config.prefix,
        component: () => import("../resources/views/dashboard/app.component"),
        children: DashboardRouter,
        meta: {},
    },
    {
        path: `${config.prefix}users`,
        component: () => import("../resources/views/user/app.component"),
        children: UserRouter,
        meta: {},
    },
    {
        path: `${config.prefix}maintenance-service`,
        component: () => import("../resources/views/maintenance-service/app.component"),
        children: MaintenanceServiceRouter,
        meta: {},
    },
    {
        path: `${config.prefix}reservation-booking`,
        component: () => import("../resources/views/reservation-booking/app.component"),
        children: ReservationBookingRouter,
        meta: {},
    },
    {
        path: `${config.prefix}visitor-logs`,
        component: () => import("../resources/views/visitor-log/app.component"),
        children: VisitorLogRouter,
        meta: {},
    },
    {
        path: `${config.prefix}advertisements`,
        component: () => import("../resources/views/advertisement/app.component"),
        children: AdvertisementRouter,
        meta: {},
    },
    {
        path: `${config.prefix}events-announcements`,
        component: () => import("../resources/views/event-announcement/app.component"),
        children: EventAnnouncementRouter,
        meta: {},
    },
    {
        path: `${config.prefix}documents`,
        component: () => import("../resources/views/document/app.component"),
        children: DocumentRouter,
        meta: {},
    },
    {
        path: `${config.prefix}samples`,
        component: () => import("../resources/views/sample/app.component"),
        children: SampleRouter,
        meta: {},
    },
    {
        path: `${config.prefix}surveys`,
        component: () => import("../resources/views/survey/app.component"),
        children: SurveyRouter,
        meta: {},
    },
    {
        path: `${config.prefix}settings`,
        component: () => import("../resources/views/setting/app.component"),
        children: SettingRouter,
        meta: {},
    },
    {
        path: `${config.prefix}inquiries`,
        component: () => import("../resources/views/inquiry/app.component"),
        children: InquiryRouter,
        meta: {},
    },
    {
        path: `${config.prefix}permissions`,
        component: () => import("../resources/views/permission/app.component"),
        children: PermissionRouter,
        meta: {},
    },
];
