export const pages = [
    {
        id: "dashboard",
        path: "dashboard.index",
        name: "Dashboard",
        icon: "fas fa-tachometer-alt",
        parent: false,
        children: [],
        allowed: ["admin", "super_admin", "staff", "company"],
        permission: "dashboard"
    },
    {
        id: "home",
        path: "setting.index",
        name: "Home Page",
        icon: "fas fa-home",
        parent: false,
        children: [],
        allowed: ["admin", "super_admin", "company"],
        permission: "web-builder"
    },

    {
        id: "user",
        path: "user.index",
        name: "Users",
        icon: "fa fa-user-circle",
        parent: false,
        children: [],
        allowed: ["admin", "super_admin", "company"],
        permission: "user"
    },
    {
        id: "reservation-booking",
        path: "test.index",
        name: "Reservation and Booking",
        icon: "fa fa-hotel",
        parent: true,
        allowed: ["admin", "super_admin", "company"],
        children: [
            {
                id: "reservation-booking-type",
                path: "reservation-booking-type.index",
                name: "Type of Amenities",
            },
            {
                id: "reservation-booking-request",
                path: "reservation-booking-request.index",
                name: "Request",
            },
            {
                id: "reservation-booking-calendar",
                path: "reservation-booking-calendar.index",
                name: "Calendar",
            },
            {
                id: "reservation-booking-manual",
                path: "reservation-booking-manual.index",
                name: "Manual Reservation",
            },
        ],
        permission: "reservation-and-booking"
    },
    {
        id: "maintenance-service",
        path: "test.index",
        name: "Maintenance Service",
        icon: "fa fa-calendar",
        parent: true,
        children: [
            {
                id: "maintenance-service-type",
                path: "maintenance-service-type.index",
                name: "Type of Service",
            },
            {
                id: "maintenance-service-request",
                path: "maintenance-service-request.index",
                name: "Maintenance Request",
            },
            {
                id: "maintenance-service-calendar",
                path: "maintenance-service-calendar.index",
                name: "Calendar",
            },
            {
                id: "maintenance-service-manual",
                path: "maintenance-service-manual.index",
                name: "Manual Service",
            },
        ],
        allowed: ["admin", "super_admin", "company"],
        permission: "maintenance-and-service"
    },
    {
        id: "advertisements",
        path: "advertisement.index",
        name: "Ads",
        icon: "fa fa-ad",
        parent: false,
        children: [],
        allowed: ["admin", "super_admin", "company"],
        permission: "ads"
    },
    {
        id: "visitor-log-book",
        path: "visitor-log.index",
        name: "Visitor Logbook",
        icon: "fa fa-users",
        parent: false,
        children: [],
        allowed: ["admin", "super_admin", "staff", "company"],
        permission: "visitor-logbook"
    },
    {
        id: "document",
        path: "document.index",
        name: "Documents",
        icon: "fa fa-folder",
        parent: false,
        children: [],
        allowed: ["admin", "super_admin", "staff", "company"],
        permission: "documents"
    },
    {
        id: "events-announcements",
        path: "events-announcements.index",
        name: "Events & Announcements",
        icon: "fa fa-bullhorn",
        parent: false,
        children: [],
        allowed: ["admin", "super_admin", "company"],
        permission: "event-and-announcement"
    },
    // {
    //     id: "bulletin-board",
    //     path: "test.index",
    //     name: "Bulletin Board",
    //     icon: "fa fa-newspaper",
    //     parent: false,
    //     children: [],
    //     allowed: ["admin", "super_admin", "company"],
    // },
    {
        id: "messaging",
        path: "inquiry.index",
        name: "Messaging",
        icon: "fa fa-message",
        parent: false,
        children: [],
        allowed: ["admin", "super_admin", "company"],
        permission: "messaging"
    },
    {
        id: "surveys",
        path: "surveys.index",
        name: "Surveys",
        icon: "fa fa-list-check",
        parent: false,
        children: [],
        allowed: ["admin", "company"],
        permission: "surveys"
    },
    // {
    //     id: "customization",
    //     path: "test.index",
    //     name: "Customization",
    //     icon: "fa fa-gear",
    //     parent: false,
    //     children: [],
    //     allowed: ["admin", "super_admin", "company"],
    // },
];
