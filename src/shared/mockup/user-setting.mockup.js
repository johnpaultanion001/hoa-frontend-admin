export const authorized = {
    allowed: ["admin", "super_admin", "staff", "company"],
    roles: [
        { value: "super_admin", title: "Super Admin" },
        { value: "admin", title: "Admin" },
        { value: "staff", title: "staff" },
        { value: "client", title: "Client" },
        { value: "company", title: "Company" },
    ],
    roles_by_role: {
        super_admin: [
            { value: "super_admin", title: "Super Admin" },
            { value: "admin", title: "Admin" },
            { value: "staff", title: "staff" },
            { value: "client", title: "Client" },
            { value: "company", title: "Company" },
        ],
        company: [
            { value: "admin", title: "Admin" },
            { value: "staff", title: "staff" },
            { value: "client", title: "Client" },
        ],
        admin: [
            { value: "staff", title: "staff" },
            { value: "client", title: "Client" },
        ],
    },
};

export const statuses = [
    { value: 0, title: "Enabled" },
    { value: 1, title: "Disabled" },
];
