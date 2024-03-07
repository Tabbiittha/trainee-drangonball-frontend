import { createRouter, createWebHistory } from '@ionic/vue-router';
import Personajes from '../views/Personajes.vue';
import HomePage from '../views/HomePage.vue'
import DetallePersonaje from '../views/DetallePersonaje.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/personajes',
    name: 'Personajes',
    component: Personajes
  },
  {
    path: '/detallepersonaje/:id', // Usar :id como el parámetro dinámico
    name: 'DetallePersonaje',
    component: DetallePersonaje,
    
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
