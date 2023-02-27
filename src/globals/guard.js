import Vue from "vue";

export default class Guard {
    authorized(to, from, next) {
        if (Vue.$storage.has("auth")) next();
        else next("/auth/login");
    }

    guest(to, from, next) {
        if (!Vue.$storage.has("auth")) next();
        else next("/");
    }
}
const guard = new Guard();

export const authorized = guard.authorized,
    guest = guard.guest;
