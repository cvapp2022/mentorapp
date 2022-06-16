import login from '../views/mentor/login.vue';
import dashboard from '../views/mentor/dashboard.vue';
import requests from '../views/mentor/requests.vue';
import requestOne from '../views/mentor/requestOne.vue';
import meetPrepare from '../views/mentor/meetPrepare.vue';
import meetRoom from '../views/mentor/meetRoom.vue';

export const mentorRoutes = [

    {
        path: '/login',
        name: 'mentorLogin',
        component: login,
        meta: {
            requireMentorGuest: true
        }
    },
    {
        path: '/dashboard',
        name: 'mentorDashboard',
        component: dashboard,
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/requests',
        name: 'mentorRequests',
        component: requests,
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/requests/:requestId',
        name: 'mentorRequestOne',
        component: requestOne,
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/meets/:meetId/prepare',
        name: 'mentorMeetPrepare',
        component: meetPrepare,
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/meets/:meetId/room',
        name: 'mentorMeetRoom',
        component: meetRoom,
        meta: {
            requireMentorAuth: true
        }
    }

]