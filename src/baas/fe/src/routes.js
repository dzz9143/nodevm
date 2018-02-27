import App from './App';
import ServiceList from './ServiceList';
import ServiceDetail from './ServiceDetail';

export default {
    path: '/',
    component: App,
    childRoutes: [
        {
            path: 'services',
            component: ServiceList,
        },
        {
            path: 'services/:name',
            component: ServiceDetail,
        }
    ],
}