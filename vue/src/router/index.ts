import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/survey',
      name: 'survey',
      component: () => import('../views/SurveyResults.vue'),
    },
    {
      path: '/takesurvey',
      name: 'takesurvey',
      component: () => import('../views/Survey.vue'),
    },
  ],
})

export default router
