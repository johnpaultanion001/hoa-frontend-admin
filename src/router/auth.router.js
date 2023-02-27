import LoginRouter from '../resources/views/login/app.router';
import ForgotPassword from '../resources/views/forgot-password/app.router';
const config = {prefix: "/auth"};

export default [

    {
        path: `${config.prefix}/login`,
        component: () => import('../resources/views/login/app.component'),
        children: LoginRouter,
        meta: { }
    },
    {
        path: `${config.prefix}/forgot-password`,
        component: () => import('../resources/views/forgot-password/app.component'),
        children: ForgotPassword,
        meta: { }
    },
];
