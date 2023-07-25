import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultsView from '../views/ResultsView.vue'
import Error404View from '../views/Error404View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search_results',
      name: 'search_results',
      component: ResultsView
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: Error404View
    }
  ]
})

export default router
