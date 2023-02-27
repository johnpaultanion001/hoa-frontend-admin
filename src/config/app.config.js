import firebaseConfig from "./firebase.config";

const config = Object.freeze({
    base_url: process.env.BASE_URL,
    base_client: process.env.VUE_APP_BASE_CLIENT,
    api_url: `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_VERSION}/admin`,
    end_point: {
        samples: "samples",
        users: "users",
        services: "services",
        auth: "authorized",
        bookings: "bookings",
        files: "files",
        visitor_logs: "visitor-logs",
        advertisements: "advertisements",
        event_announcements: "event-announcements",
        documents: "documents",
        user_settings: "user-settings",
        user_details: "user-details",
        inquiries: "inquiries",
        analytics: "analytics",
        permission: "permissions",
        answers: "answers",
        options: "options",
        questions: "questions", 
        responses: "responses",
        surveys: "surveys",
    },
    firebaseConfig: firebaseConfig,
});

export default config;
