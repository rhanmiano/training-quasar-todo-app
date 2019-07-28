
const routes = [
  {
    path: '/',
    component: () => import('pages/Todo.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/charts',
    component: () => import('pages/Charts.vue'),
    children: [],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
